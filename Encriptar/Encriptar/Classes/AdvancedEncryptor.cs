using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class AdvancedEncryptor
{
    private readonly string rsaPrivateKey; // Clave RSA privada para descifrado
    private readonly string rsaPublicKey;  // Clave RSA pública para cifrado
    private readonly byte[] hmacKey;       // Clave para HMAC

    public AdvancedEncryptor()
    {
        // Generar claves RSA y una clave HMAC fija para simplicidad
        using (var rsa = RSA.Create(2048))
        {
            rsaPrivateKey = Convert.ToBase64String(rsa.ExportRSAPrivateKey());
            rsaPublicKey = Convert.ToBase64String(rsa.ExportRSAPublicKey());
        }

        using (var hmac = new HMACSHA256())
        {
            hmacKey = hmac.Key;
        }
    }

    public string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText))
            throw new ArgumentException("El texto no puede estar vacío.");

        // Generar una clave y un IV para AES
        using (var aes = Aes.Create())
        {
            aes.GenerateKey();
            aes.GenerateIV();

            // Cifrar el texto con AES
            using (var encryptor = aes.CreateEncryptor())
            {
                byte[] plainBytes = Encoding.UTF8.GetBytes(plainText);
                byte[] encryptedBytes = encryptor.TransformFinalBlock(plainBytes, 0, plainBytes.Length);

                // Cifrar la clave AES con RSA
                byte[] encryptedKey;
                using (var rsa = RSA.Create())
                {
                    rsa.ImportRSAPublicKey(Convert.FromBase64String(rsaPublicKey), out _);
                    encryptedKey = rsa.Encrypt(aes.Key, RSAEncryptionPadding.Pkcs1);
                }

                // Crear HMAC para la integridad
                using (var hmac = new HMACSHA256(hmacKey))
                {
                    byte[] hmacHash = hmac.ComputeHash(encryptedBytes);

                    // Combinar todos los componentes: [IV][ClaveAES][TextoCifrado][HMAC]
                    using (var ms = new MemoryStream())
                    {
                        ms.Write(aes.IV, 0, aes.IV.Length);
                        ms.Write(encryptedKey, 0, encryptedKey.Length);
                        ms.Write(encryptedBytes, 0, encryptedBytes.Length);
                        ms.Write(hmacHash, 0, hmacHash.Length);

                        return Convert.ToBase64String(ms.ToArray());
                    }
                }
            }
        }
    }

    public string Decrypt(string cipherText)
    {
        if (string.IsNullOrEmpty(cipherText))
            throw new ArgumentException("El texto cifrado no puede estar vacío.");

        byte[] cipherBytes = Convert.FromBase64String(cipherText);

        using (var ms = new MemoryStream(cipherBytes))
        {
            // Leer IV
            byte[] iv = new byte[16];
            ms.Read(iv, 0, iv.Length);

            // Leer clave AES cifrada
            byte[] encryptedKey = new byte[256];
            ms.Read(encryptedKey, 0, encryptedKey.Length);

            // Leer texto cifrado
            byte[] encryptedText = new byte[ms.Length - iv.Length - encryptedKey.Length - 32];
            ms.Read(encryptedText, 0, encryptedText.Length);

            // Leer HMAC
            byte[] hmacHash = new byte[32];
            ms.Read(hmacHash, 0, hmacHash.Length);

            // Verificar HMAC
            using (var hmac = new HMACSHA256(hmacKey))
            {
                byte[] computedHash = hmac.ComputeHash(encryptedText);
                if (!CryptographicOperations.FixedTimeEquals(computedHash, hmacHash))
                {
                    throw new CryptographicException("Integridad comprometida: HMAC no válido.");
                }
            }

            // Descifrar clave AES con RSA
            byte[] aesKey;
            using (var rsa = RSA.Create())
            {
                rsa.ImportRSAPrivateKey(Convert.FromBase64String(rsaPrivateKey), out _);
                aesKey = rsa.Decrypt(encryptedKey, RSAEncryptionPadding.Pkcs1);
            }

            // Descifrar texto con AES
            using (var aes = Aes.Create())
            {
                aes.Key = aesKey;
                aes.IV = iv;

                using (var decryptor = aes.CreateDecryptor())
                {
                    byte[] decryptedBytes = decryptor.TransformFinalBlock(encryptedText, 0, encryptedText.Length);
                    return Encoding.UTF8.GetString(decryptedBytes);
                }
            }
        }
    }
}
