using System;
using System.Collections.Generic;
using System.IdentityModel.Tokens.Jwt;
using System.Linq;
using System.Security.Claims;
using System.Security.Cryptography;
using System.Text;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Token;
using api.DTO.Users;
using api.Interface;
using api.Mappers.Users;
using api.Model;
using api.Model.Entites;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Identity;
using Microsoft.IdentityModel.Tokens;

namespace api.Repository
{
    public class UserRepository : IUserRepository
    {
        private readonly ApplicationDbContext _context;
        private readonly IConfiguration _config;

        public UserRepository(ApplicationDbContext context, IConfiguration config)
        {
            _context = context;
            _config = config;
        }

        public async Task<Guid?> RegisterAccountAsync(CreateUserDTO createUserDTO)
        {
            var user = new User();

            var hashedPassword = new PasswordHasher<User>().HashPassword(
                user,
                createUserDTO.Password
            );

            var registerUser = createUserDTO.ToUserFromCreateUserDto(hashedPassword);
            var createdUser = await _context.RegisterAccount(registerUser);

            if (!createdUser.IsSuccess)
            {
                return null;
            }
            return createdUser.Payload;
        }

        public async Task<TokenResponseDTO?> LoginAccountAsync(LoginUserDTO loginUserDTO)
        {
            var registerUser = await _context.CheckIfUserExists(loginUserDTO);
            if (!registerUser.IsSuccess)
            {
                return null;
            }
            var user = registerUser.Payload;
            if (
                new PasswordHasher<User>().VerifyHashedPassword(
                    user!,
                    user!.PasswordHash!,
                    loginUserDTO.Password
                ) == PasswordVerificationResult.Failed
            )
            {
                return null;
            }

            return new TokenResponseDTO
            {
                Id = user.Id,
                Username = user.UserName,
                Role = user.Role,
                EmailAddress = user.EmailAddress,
                AccessToken = CreateAccessToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
            };
        }

        private string CreateAccessToken(User user)
        {
            var claim = new List<Claim>
            {
                new Claim(ClaimTypes.Name, user.UserName),
                new Claim(ClaimTypes.NameIdentifier, user.Id.ToString()),
                new Claim(ClaimTypes.Email, user.EmailAddress),
                new Claim(ClaimTypes.Role, user.Role),
            };

            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(_config.GetValue<string>("JWT:SigningKey")!)
            );
            var creds = new SigningCredentials(key, SecurityAlgorithms.Aes256CbcHmacSha512);

            var tokenDescriptor = new JwtSecurityToken(
                issuer: _config["JWT:Issuer"],
                audience: _config["JWT:Audience"],
                claims: claim,
                expires: DateTime.UtcNow.AddDays(1),
                signingCredentials: creds
            );

            return new JwtSecurityTokenHandler().WriteToken(tokenDescriptor);
        }

        private string GenerateRefreshToken()
        {
            var randomNumber = new byte[32];
            using var rng = RandomNumberGenerator.Create();
            rng.GetBytes(randomNumber);
            return Convert.ToBase64String(randomNumber);
        }

        private async Task<string?> GenerateAndSaveRefreshTokenAsync(User user)
        {
            var refreshToken = GenerateRefreshToken();
            user.RefreshToken = refreshToken;
            user.RefreshTokenExpiryDate = DateTime.UtcNow.AddDays(7);
            var refreshTokenAdded = await _context.SaveRefreshToken(user);
            if (!refreshTokenAdded.IsSuccess)
            {
                return null;
            }
            return refreshToken;

            //more code
        }

        private async Task<User?> ValidateRefreshTokenAsync(Guid id)
        {
            var user = await _context.CheckIfRefreshTokenIsValid(id);
            if (!user.IsSuccess)
            {
                return null;
            }
            return user.Payload;
        }

        public async Task<TokenResponseDTO?> RefreshTokenAsync(Guid id)
        {
            var user = await ValidateRefreshTokenAsync(id);
            if (user == null)
            {
                return null;
            }
            return new TokenResponseDTO
            {
                Id = user.Id,
                Username = user.UserName,
                Role = user.Role,
                EmailAddress = user.EmailAddress,
                AccessToken = CreateAccessToken(user),
                RefreshToken = await GenerateAndSaveRefreshTokenAsync(user),
            };
        }
    }
}
