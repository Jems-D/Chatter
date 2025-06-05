using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Constants;
using api.DTO.Token;
using api.DTO.Users;
using api.Model;
using api.Model.Entites;

namespace api.Mappers.Users
{
    public static class UserMappers
    {
        /// <summary>
        /// Transforms the createUserDto to user for inserting data
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="hashedPassword"></param>
        /// <returns></returns>
        public static User ToUserFromCreateUserDto(this CreateUserDTO dto, string hashedPassword)
        {
            return new User
            {
                UserName = dto.Username,
                EmailAddress = dto.EmailAddress,
                PasswordHash = hashedPassword,
                Role = RoleConstants.User.ToString(),
                CreatedAt = DateTime.UtcNow,
                UpdatedAt = DateTime.UtcNow,
            };
        }

        /// <summary>
        /// Transforms the TokenResponseDTO to UserResponseDTO
        /// </summary>
        /// <param name="dto"></param>
        /// <returns></returns>
        public static UserResponseDTO ToUserResponseFromTokenResponse(this TokenResponseDTO dto)
        {
            return new UserResponseDTO
            {
                Id = dto.Id,
                Username = dto.Username,
                Role = dto.Role,
                EmailAddress = dto.EmailAddress,
            };
        }
    }
}
