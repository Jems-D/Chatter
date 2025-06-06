using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using api.Constants;
using api.DTO.Chats;
using api.DTO.SPs;
using api.DTO.Users;
using api.Model;
using Microsoft.Data.SqlClient;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Internal;
using Microsoft.Identity.Client;

namespace api.Data
{
    public class ApplicationDbContext : DbContext
    {
        public ApplicationDbContext(DbContextOptions dbContextOptions)
            : base(dbContextOptions) { }

        public DbSet<User> Users;
        public DbSet<Chat> Chats;

        #region  Authentication
        public async Task<APIResult<Guid?>> RegisterAccount(User user)
        {
            var result = new APIResult<Guid?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_RegisterAccount.ToString();
                    command.Parameters.Add(new SqlParameter("@Username", user.UserName));
                    command.Parameters.Add(new SqlParameter("@EmailAddress", user.EmailAddress));
                    command.Parameters.Add(new SqlParameter("@PasswordHash", user.PasswordHash));
                    command.Parameters.Add(new SqlParameter("@UserRole", user.Role));
                    command.Parameters.Add(new SqlParameter("@CreatedAt", user.CreatedAt));
                    command.Parameters.Add(new SqlParameter("@UpdatedAt", user.UpdatedAt));

                    await Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetGuid(0);
                            }
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message =
                                "The operation was successful but no records were returned";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }

            return result;
        }

        public async Task<APIResult<User>?> CheckIfUserExists(LoginUserDTO user)
        {
            var result = new APIResult<User>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_CheckIfUserExists.ToString();
                    command.Parameters.Add(new SqlParameter("@EmailAddress", user.EmailAddress));

                    await Database.OpenConnectionAsync();
                    var registeredUser = new User();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                registeredUser.Id = reader.GetGuid(reader.GetOrdinal("user_id"));
                                registeredUser.UserName = reader.GetString(
                                    reader.GetOrdinal("user_name")
                                );
                                registeredUser.EmailAddress = reader.GetString(
                                    reader.GetOrdinal("email_add")
                                );
                                registeredUser.Role = reader.GetString(
                                    reader.GetOrdinal("user_role")
                                );
                                registeredUser.PasswordHash = reader.GetString(
                                    reader.GetOrdinal("password_hash")
                                );
                            }

                            result.Payload = registeredUser;
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message =
                                "The operation was successful but no records were returned";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<int>> SaveRefreshToken(User user)
        {
            var result = new APIResult<int>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText =
                        StoredProcedureConstants.SP_GenerateAndSaveRefreshToken.ToString();
                    command.Parameters.Add(new SqlParameter("@Id", user.Id));
                    command.Parameters.Add(new SqlParameter("@RefreshToken", user.RefreshToken));
                    command.Parameters.Add(
                        new SqlParameter("@ExpiryDate", user.RefreshTokenExpiryDate)
                    );
                    command.Parameters.Add(new SqlParameter("@UpdatedAt", user.UpdatedAt));

                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(0);
                            }
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message =
                                "The operation was successful but no records were returned";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<User?>> CheckIfRefreshTokenIsValid(Guid id)
        {
            var result = new APIResult<User?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText =
                        StoredProcedureConstants.SP_CheckIfRefreshTokenIsValid.ToString();
                    command.Parameters.Add(new SqlParameter("@Id", id));

                    await Database.OpenConnectionAsync();
                    var user = new User();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                user.Id = reader.GetGuid(reader.GetOrdinal("user_id"));
                                user.UserName = reader.GetString(reader.GetOrdinal("user_name"));
                                user.EmailAddress = reader.GetString(
                                    reader.GetOrdinal("email_add")
                                );
                                user.Role = reader.GetString(reader.GetOrdinal("user_role"));
                            }
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message =
                                "The operation was successful but no records were returned";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion

        #region Chats

        public async Task<APIResult<List<Chat?>>> GetAllChatsAsync()
        {
            var result = new APIResult<List<Chat?>>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_GetAllChats.ToString();

                    var chats = new List<Chat?>();
                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var chat = new Chat
                                {
                                    id = reader.GetInt32(reader.GetOrdinal("chat_id")),
                                    ChatTitle = reader.GetString(reader.GetOrdinal("chat_title")),
                                    ChatContent = reader.GetString(
                                        reader.GetOrdinal("chat_content")
                                    ),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at")),
                                    CreatedBy = reader.GetString(
                                        reader.GetOrdinal("created_by_name")
                                    ),
                                };

                                chats.Add(chat);
                            }

                            result.Payload = chats;
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message = "No result";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<Chat?>> InsertChatAsync(Chat chat)
        {
            var result = new APIResult<Chat?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = System.Data.CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_InsertChat.ToString();
                    command.Parameters.Add(new SqlParameter("@ChatTitle", chat.ChatTitle));
                    command.Parameters.Add(new SqlParameter("@ChatContent", chat.ChatContent));
                    command.Parameters.Add(new SqlParameter("@CreatedBy", chat.CreatedBy));
                    command.Parameters.Add(new SqlParameter("@UserId", chat.CreatedById));
                    command.Parameters.Add(new SqlParameter("@CreatedAt", chat.CreatedAt));
                    command.Parameters.Add(new SqlParameter("@UpdatedAt", chat.UpdatedAt));

                    var insertedChat = new Chat();
                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                insertedChat.id = reader.GetInt32(reader.GetOrdinal("chat_id"));
                                insertedChat.ChatTitle = reader.GetString(
                                    reader.GetOrdinal("chat_title")
                                );
                                insertedChat.ChatTitle = reader.GetString(
                                    reader.GetOrdinal("chat_content")
                                );
                                insertedChat.CreatedBy = reader.GetString(
                                    reader.GetOrdinal("created_by_name")
                                );
                                insertedChat.CreatedAt = reader.GetDateTime(
                                    reader.GetOrdinal("created_at")
                                );
                            }

                            result.Payload = insertedChat;
                        }
                        else
                        {
                            result.StatusCode = 204;
                            result.Message = "No result";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 400;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion
    }
}
