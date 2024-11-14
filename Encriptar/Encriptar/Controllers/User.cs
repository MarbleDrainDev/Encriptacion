using Microsoft.AspNetCore.Mvc;
using MySql.Data.MySqlClient;
using Encriptar.Classes; // Asegúrate de que esta ruta sea correcta
using System;
using System.Collections.Generic;
using System.Data;
using System.Threading.Tasks;

namespace Encriptar.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class UserController : ControllerBase
    {
        private readonly string connectionString = "Server=localhost;Database=Cafeteria;Uid=root;Pwd=1234;";
        private readonly CustomEncryptor _encryptor;

        public UserController()
        {
            _encryptor = new CustomEncryptor();
        }

        [HttpPost("register")]
        public async Task<IActionResult> Register([FromBody] User user)
        {
            user.Password = _encryptor.Encrypt(user.Password);

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "INSERT INTO Users (Name, Email, Password) VALUES (@Name, @Email, @Password)";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", user.Name);
                    command.Parameters.AddWithValue("@Email", user.Email);
                    command.Parameters.AddWithValue("@Password", user.Password);
                    await command.ExecuteNonQueryAsync();
                }
            }

            return Ok(user);
        }

        [HttpPost("login")]
        public async Task<IActionResult> Login([FromBody] User login)
        {
            User user = null;

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "SELECT * FROM Users WHERE Email = @Email";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Email", login.Email);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            user = new User
                            {
                                Id = reader.GetInt32("Id"),
                                Name = reader.GetString("Name"),
                                Email = reader.GetString("Email"),
                                Password = reader.GetString("Password")
                            };
                        }
                    }
                }
            }

            if (user == null || _encryptor.Decrypt(user.Password) != login.Password)
            {
                return Unauthorized();
            }

            return Ok(user);
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsers()
        {
            var users = new List<User>();

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "SELECT * FROM Users";
                using (var command = new MySqlCommand(query, connection))
                {
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        while (await reader.ReadAsync())
                        {
                            users.Add(new User
                            {
                                Id = reader.GetInt32("Id"),
                                Name = reader.GetString("Name"),
                                Email = reader.GetString("Email"),
                                Password = reader.GetString("Password")
                            });
                        }
                    }
                }
            }

            return Ok(users);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetUserById(int id)
        {
            User user = null;

            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "SELECT * FROM Users WHERE Id = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (await reader.ReadAsync())
                        {
                            user = new User
                            {
                                Id = reader.GetInt32("Id"),
                                Name = reader.GetString("Name"),
                                Email = reader.GetString("Email"),
                                Password = reader.GetString("Password")
                            };
                        }
                    }
                }
            }

            if (user == null)
            {
                return NotFound();
            }

            return Ok(user);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateUser(int id, [FromBody] User updatedUser)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "UPDATE Users SET Name = @Name, Email = @Email, Password = @Password WHERE Id = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Name", updatedUser.Name);
                    command.Parameters.AddWithValue("@Email", updatedUser.Email);
                    command.Parameters.AddWithValue("@Password", _encryptor.Encrypt(updatedUser.Password));
                    command.Parameters.AddWithValue("@Id", id);
                    await command.ExecuteNonQueryAsync();
                }
            }

            return Ok(updatedUser);
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteUser(int id)
        {
            using (var connection = new MySqlConnection(connectionString))
            {
                await connection.OpenAsync();
                var query = "DELETE FROM Users WHERE Id = @Id";
                using (var command = new MySqlCommand(query, connection))
                {
                    command.Parameters.AddWithValue("@Id", id);
                    await command.ExecuteNonQueryAsync();
                }
            }

            return Ok();
        }
    }
}
