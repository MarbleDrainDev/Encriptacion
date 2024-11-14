using System;
using System.Collections.Generic;
using System.Security.Cryptography;
using System.Text;

public class CustomEncryptor

{
    public string Encrypt(string password)
    {
        var binaryList = new List<string>();

        for (int i = 0; i < password.Length; i++)
        {
            string binaryChar = Convert.ToString(password[i], 2).PadLeft(8, '0');
            binaryList.Add(binaryChar);
        }

        for (int i = 0; i < binaryList.Count; i++)
        {
            int current = Convert.ToInt32(binaryList[i], 2);
            int next = Convert.ToInt32(binaryList[(i + 1) % binaryList.Count], 2);
            binaryList[i] = Convert.ToString(current + next, 2).PadLeft(8, '0');
        }

        StringBuilder encrypted = new StringBuilder();
        Random rand = new Random();

        for (int i = 0; i < binaryList.Count; i++)
        {
            encrypted.Append(binaryList[i]);

            if (rand.Next(0, 2) == 1)
            {
                char charToInsert = (char)(password[i] + 1);
                encrypted.Append(Convert.ToString(charToInsert, 2).PadLeft(8, '0'));
            }
        }

        return encrypted.ToString();
    }

    public string Decrypt(string encryptedPassword)
    {
        var binaryList = new List<string>();

        for (int i = 0; i < encryptedPassword.Length; i += 8)
        {
            binaryList.Add(encryptedPassword.Substring(i, 8));
        }

        for (int i = binaryList.Count - 1; i > 0; i--)
        {
            int originalChar = Convert.ToInt32(binaryList[i - 1], 2);
            int insertedChar = Convert.ToInt32(binaryList[i], 2);

            if (insertedChar == originalChar + 1)
            {
                binaryList.RemoveAt(i);
            }
        }

        for (int i = binaryList.Count - 1; i >= 0; i--)
        {
            int current = Convert.ToInt32(binaryList[i], 2);
            int next = Convert.ToInt32(binaryList[(i + 1) % binaryList.Count], 2);
            binaryList[i] = Convert.ToString(current - next, 2).PadLeft(8, '0');
        }

        StringBuilder originalPassword = new StringBuilder();

        foreach (string binaryChar in binaryList)
        {
            originalPassword.Append((char)Convert.ToInt32(binaryChar, 2));
        }
        return originalPassword.ToString();
    }
}
