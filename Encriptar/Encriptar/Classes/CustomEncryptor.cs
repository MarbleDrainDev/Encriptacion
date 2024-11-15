using System;
using System.IO;
using System.Security.Cryptography;
using System.Text;

public class CustomEncryptor
{
    private readonly byte[] Key;
    private readonly byte[] IV;

    public CustomEncryptor(string key = null, string iv = null)
    {
        // Convertimos cualquier texto en una clave válida para AES
        Key = GenerateKey(key ?? "clavePredeterminada");
        IV = GenerateIV(iv ?? "ivPredeterminado");
    }

    private byte[] GenerateKey(string key)
    {
        // Genera 32 bytes para la clave a partir del texto ingresado
        using (SHA256 sha256 = SHA256.Create())
        {
            return sha256.ComputeHash(Encoding.UTF8.GetBytes(key));
        }
    }

    private byte[] GenerateIV(string iv)
    {
        // Genera 16 bytes para el vector de inicialización a partir del texto ingresado
        using (MD5 md5 = MD5.Create())
        {
            return md5.ComputeHash(Encoding.UTF8.GetBytes(iv));
        }
    }

    public string Encrypt(string plainText)
    {
        if (string.IsNullOrEmpty(plainText))
            throw new ArgumentException("El texto plano no puede estar vacío.", nameof(plainText));

        try
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Key;
                aesAlg.IV = IV;
                aesAlg.Mode = CipherMode.CBC; // Modo seguro
                aesAlg.Padding = PaddingMode.PKCS7;

                ICryptoTransform encryptor = aesAlg.CreateEncryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msEncrypt = new MemoryStream())
                {
                    using (CryptoStream csEncrypt = new CryptoStream(msEncrypt, encryptor, CryptoStreamMode.Write))
                    using (StreamWriter swEncrypt = new StreamWriter(csEncrypt, Encoding.UTF8))
                    {
                        swEncrypt.Write(plainText);
                    }
                    return Convert.ToBase64String(msEncrypt.ToArray());
                }
            }
        }
        catch (CryptographicException ex)
        {
            throw new InvalidOperationException("Error durante la encriptación.", ex);
        }
    }

    public string Decrypt(string cipherText)
    {
        if (string.IsNullOrEmpty(cipherText))
            throw new ArgumentException("El texto cifrado no puede estar vacío.", nameof(cipherText));

        try
        {
            using (Aes aesAlg = Aes.Create())
            {
                aesAlg.Key = Key;
                aesAlg.IV = IV;
                aesAlg.Mode = CipherMode.CBC; // Modo seguro
                aesAlg.Padding = PaddingMode.PKCS7;

                ICryptoTransform decryptor = aesAlg.CreateDecryptor(aesAlg.Key, aesAlg.IV);

                using (MemoryStream msDecrypt = new MemoryStream(Convert.FromBase64String(cipherText)))
                using (CryptoStream csDecrypt = new CryptoStream(msDecrypt, decryptor, CryptoStreamMode.Read))
                using (StreamReader srDecrypt = new StreamReader(csDecrypt, Encoding.UTF8))
                {
                    return srDecrypt.ReadToEnd();
                }
            }
        }
        catch (CryptographicException ex)
        {
            throw new InvalidOperationException("Error durante la desencriptación.", ex);
        }
    }
}
