using System;
using System.Collections.Generic;
using System.Data;
using System.Linq;
using System.Threading.Tasks;
using System.Xml.XPath;
using api.Constants;
using api.DTO.Chats;
using api.DTO.ChatterStats;
using api.DTO.SPs;
using api.DTO.Users;
using api.Helpers;
using api.Model;
using api.SignalRHub;
using Microsoft.AspNetCore.Mvc.ApplicationModels;
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
        public DbSet<Emoji> Emojis;
        public DbSet<Reaction> Reactions;
        public DbSet<Comment> Comments;

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

                    var chatsDictionary = new Dictionary<int, Chat>();
                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                int chatId = reader.GetInt32(reader.GetOrdinal("chat_id"));
                                if (!chatsDictionary.TryGetValue(chatId, out Chat? chat))
                                {
                                    chat = new Chat
                                    {
                                        id = reader.GetInt32(reader.GetOrdinal("chat_id")),
                                        ChatTitle = reader.GetString(
                                            reader.GetOrdinal("chat_title")
                                        ),
                                        ChatContent = reader.GetString(
                                            reader.GetOrdinal("chat_content")
                                        ),
                                        CreatedAt = reader.GetDateTime(
                                            reader.GetOrdinal("created_at")
                                        ),
                                        CreatedById = reader.GetGuid(reader.GetOrdinal("user_id")),
                                        CreatedBy = reader.GetString(
                                            reader.GetOrdinal("created_by_name")
                                        ),
                                        Reactions = new List<Reaction>(),
                                    };

                                    chatsDictionary.Add(chatId, chat);
                                }

                                if (!await reader.IsDBNullAsync(reader.GetOrdinal("reaction_id")))
                                {
                                    var reactions = new Reaction
                                    {
                                        ReactionId = reader.GetInt32(
                                            reader.GetOrdinal("reaction_id")
                                        ),
                                        ChatId = reader.GetInt32(reader.GetOrdinal("ChatId")),
                                        UserId = reader.GetGuid(
                                            reader.GetOrdinal("UserIdReaction")
                                        ),
                                        EmojiId = reader.GetInt32(reader.GetOrdinal("emoji_id")),
                                        Emoji = new Emoji(),
                                    };

                                    chat.Reactions.Add(reactions);

                                    var emoji = new Emoji
                                    {
                                        EmojiText = reader.GetString(
                                            reader.GetOrdinal("emoji_text")
                                        ),
                                        EmojiSymbol = reader.GetString(
                                            reader.GetOrdinal("emoji_symbol")
                                        ),
                                    };

                                    reactions.Emoji = emoji;
                                }
                            }

                            result.Payload = chatsDictionary.Values.ToList();
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
                    command.Parameters.Add(
                        new SqlParameter("@UserId", SqlDbType.UniqueIdentifier)
                        {
                            Value = chat.CreatedById,
                        }
                    );
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

        public async Task<APIResult<int?>> DeleteChatAsync(int chatId)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                IsSuccess = true,
                Message = "Success",
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_DeleteChat.ToString();
                    command.Parameters.Add(new SqlParameter("@ChatId", chatId));

                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(
                                    reader.GetOrdinal("OperationStatus")
                                );
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.IsSuccess = false;
                result.Message = ex.Message;
            }

            return result;
        }

        #endregion


        #region  Emojis

        public async Task<APIResult<List<Emoji>>> GetAllEmojisAsync()
        {
            var result = new APIResult<List<Emoji>>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_GetAllEmojis.ToString();

                    var emojis = new List<Emoji>();
                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var emoji = new Emoji
                                {
                                    EmojiId = reader.GetInt32(reader.GetOrdinal("emoji_id")),
                                    EmojiSymbol = reader.GetString(
                                        reader.GetOrdinal("emoji_symbol")
                                    ),
                                    EmojiText = reader.GetString(reader.GetOrdinal("emoji_text")),
                                };

                                emojis.Add(emoji);
                            }

                            result.Payload = emojis;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion


        #region  Reactions

        //FIx the payload
        public async Task<APIResult<int?>> InsertReactionAsync(Reaction reaction)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };
            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_InsertReaction.ToString();
                    command.Parameters.Add(new SqlParameter("@ChatId", reaction.ChatId));
                    command.Parameters.Add(new SqlParameter("@UserId", reaction.UserId));
                    command.Parameters.Add(new SqlParameter("@EmojiId", reaction.EmojiId));
                    command.Parameters.Add(new SqlParameter("@CreatedAt", reaction.CreatedAt));

                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(reader.GetOrdinal("Return Value"));
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }

            return result;
        }

        public async Task<APIResult<int?>> DeleteReactionsAsync(int reactionId)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_DeleteReaction.ToString();
                    command.Parameters.Add(new SqlParameter("@ReactionId", reactionId));

                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(
                                    reader.GetOrdinal("OperationStatus")
                                );
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion

        #region Comments

        public async Task<APIResult<List<Comment?>>> GetAllCommentAsync(int? chatId)
        {
            var result = new APIResult<List<Comment>>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };
            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText =
                        StoredProcedureConstants.SP_GetAllCommentsPerChat.ToString();
                    command.Parameters.Add(new SqlParameter("@ChatId", chatId));

                    var comments = new List<Comment>();
                    await Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var comment = new Comment
                                {
                                    CommentId = reader.GetInt32(reader.GetOrdinal("comment_id")),
                                    CreatedById = reader.GetGuid(reader.GetOrdinal("user_id")),
                                    ChatId = reader.GetInt32(reader.GetOrdinal("chat_id")),
                                    Content = reader.GetString(reader.GetOrdinal("content")),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at")),
                                    IsDisabled = reader.GetBoolean(
                                        reader.GetOrdinal("is_disabled")
                                    ),
                                    User = new User(),
                                };

                                var user = new User
                                {
                                    UserName = reader.GetString(reader.GetOrdinal("user_name")),
                                };

                                comment.User = user;
                                comments.Add(comment);
                            }

                            result.Payload = comments;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<int?>> InsertCommentAsync(Comment comment)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_InsertComment.ToString();
                    command.Parameters.Add(new SqlParameter("@ChatId", comment.ChatId));
                    command.Parameters.Add(new SqlParameter("@Content", comment.Content));
                    command.Parameters.Add(new SqlParameter("@UserId", comment.CreatedById));
                    command.Parameters.Add(new SqlParameter("@CreatedAt", comment.CreatedAt));
                    command.Parameters.Add(new SqlParameter("@UpdatedAt", comment.UpdatedAt));

                    await Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(reader.GetOrdinal("comment_id"));
                            }
                        }
                        else
                        {
                            result.StatusCode = 500;
                            result.Message = "Server Error";
                            result.IsSuccess = false;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<int?>> DeleteCommentAsync(int commentId)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_DeleteComment.ToString();
                    command.Parameters.Add(new SqlParameter("@CommentId", commentId));

                    await Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                result.Payload = reader.GetInt32(
                                    reader.GetOrdinal("OperationStatus")
                                );
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion


        #region Admin-Users

        public async Task<APIResult<List<User?>>> GetAllUsersAsync()
        {
            var result = new APIResult<List<User?>>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_GetAllUsers.ToString();
                    var users = new List<User?>();
                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            while (await reader.ReadAsync())
                            {
                                var user = new User
                                {
                                    Id = reader.GetGuid(reader.GetOrdinal("user_id")),
                                    UserName = reader.GetString(reader.GetOrdinal("user_name")),
                                    Role = reader.GetString(reader.GetOrdinal("user_role")),
                                    CreatedAt = reader.GetDateTime(reader.GetOrdinal("created_at")),
                                    UpdatedAt = reader.GetDateTime(reader.GetOrdinal("updated_at")),
                                };

                                users.Add(user);
                            }

                            result.Payload = users;
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        public async Task<APIResult<int?>> ChangeUserRoleAsync(Guid id, ChangeRoleDTO newRole)
        {
            var result = new APIResult<int?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_ChangeUserRole.ToString();
                    command.Parameters.Add(new SqlParameter("@UserId", id));
                    command.Parameters.Add(new SqlParameter("@NewRole", newRole.NewRole));

                    await Database.OpenConnectionAsync();
                    int rowsAffected = await command.ExecuteNonQueryAsync();
                    result.Payload = rowsAffected;
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }

            return result;
        }

        public async Task<APIResult<UserStatsDTO?>> GetUserStatsAsync()
        {
            var result = new APIResult<UserStatsDTO?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_UserStats.ToString();

                    await Database.OpenConnectionAsync();
                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                var stats = new UserStatsDTO
                                {
                                    TotalCount = reader.GetInt32(reader.GetOrdinal("total_users")),
                                    UserCount = reader.GetInt32(reader.GetOrdinal("user_count")),
                                    AdminCount = reader.GetInt32(reader.GetOrdinal("admin_count")),
                                    ModCount = reader.GetInt32(reader.GetOrdinal("mod_count")),
                                };

                                result.Payload = stats;
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion

        #region Admin-Shared
        public async Task<APIResult<ChatterStatsDTO?>> GetChatterStatsAsync()
        {
            var result = new APIResult<ChatterStatsDTO?>
            {
                StatusCode = 200,
                Message = "Success",
                IsSuccess = true,
            };

            try
            {
                using (var command = Database.GetDbConnection().CreateCommand())
                {
                    command.CommandType = CommandType.StoredProcedure;
                    command.CommandText = StoredProcedureConstants.SP_ChatterStats.ToString();

                    await Database.OpenConnectionAsync();

                    using (var reader = await command.ExecuteReaderAsync())
                    {
                        if (reader.HasRows)
                        {
                            if (await reader.ReadAsync())
                            {
                                var stats = new ChatterStatsDTO
                                {
                                    ChatCount = reader.GetInt32(reader.GetOrdinal("chat_count")),
                                    CommentCount = reader.GetInt32(
                                        reader.GetOrdinal("comment_count")
                                    ),
                                    ReactionCount = reader.GetInt32(
                                        reader.GetOrdinal("reaction_count")
                                    ),
                                };
                                result.Payload = stats;
                            }
                        }
                    }
                }
            }
            catch (SqlException ex)
            {
                result.StatusCode = 500;
                result.Message = ex.Message;
                result.IsSuccess = false;
            }
            return result;
        }

        #endregion
    }
}
