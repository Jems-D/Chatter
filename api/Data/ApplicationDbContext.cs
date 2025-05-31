using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Constants;
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

        public async Task<APIResult<User>> CheckIfUserExists(LoginUserDTO user)
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
                                registeredUser.PasswordHash = reader.GetString(
                                    reader.GetOrdinal("password_hash")
                                );
                                registeredUser.Role = reader.GetString(
                                    reader.GetOrdinal("user_role")
                                );
                            }

                            result.Payload = registeredUser;
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
                    command.Parameters.Add(new SqlParameter("@Updated", user.UpdatedAt));

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
    }
}
