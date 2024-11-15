using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

namespace Encriptar.Classes
{
    public class CustomEncryptor
    {
        // M�todo de rotaci�n circular (Shift) de bits
        private static char RotateBits(char c, int shift)
        {
            int bitCount = sizeof(char) * 8; // N�mero de bits en un char (16 bits para char)
            int result = c;
            result = (result << shift) | (result >> (bitCount - shift)); // Rotaci�n circular
            return (char)(result & 0xFFFF); // Limitar al rango de char (16 bits)
        }

        // M�todo de sustituci�n simple (puedes reemplazarlo por algo m�s complejo si lo deseas)
        private static char Substitute(char c, string key)
        {
            int sumKey = 0;
            foreach (char k in key)
            {
                sumKey += k; // Sumar valores ASCII de la clave
            }
            return (char)((c + sumKey) % 256); // Modificar el car�cter con la suma de la clave
        }

        // M�todo para cifrar un texto utilizando el proceso complejo
        public string Encrypt(string plainText)
        {
            string secretKey = "ClaveSuperSecreta"; // Clave secreta
            char[] result = new char[plainText.Length];
            for (int i = 0; i < plainText.Length; i++)
            {
                char currentChar = plainText[i];
                int shiftAmount = secretKey[i % secretKey.Length]; // Usar la clave para determinar el desplazamiento
                currentChar = RotateBits(currentChar, shiftAmount); // Rotaci�n de bits
                currentChar = Substitute(currentChar, secretKey); // Sustituci�n basada en la clave
                result[i] = currentChar;
            }
            return new string(result);
        }

        // M�todo para descifrar el texto cifrado utilizando el proceso inverso
        public string Decrypt(string cipherText)
        {
            string secretKey = "ClaveSuperSecreta"; // Clave secreta
            char[] result = new char[cipherText.Length];
            for (int i = 0; i < cipherText.Length; i++)
            {
                char currentChar = cipherText[i];
                int shiftAmount = secretKey[i % secretKey.Length];
                currentChar = Substitute(currentChar, secretKey); // Invertir la sustituci�n
                currentChar = RotateBits(currentChar, 16 - (shiftAmount % 16)); // Rotaci�n inversa
                result[i] = currentChar;
            }
            return new string(result);
        }
    }
}
