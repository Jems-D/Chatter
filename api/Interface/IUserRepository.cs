using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Token;
using api.DTO.Users;
using api.Model;
using api.Model.Entites;

namespace api.Interface
{
    public interface IUserRepository
    {
        Task<Guid?> RegisterAccountAsync(CreateUserDTO createUserDTO);
        Task<TokenResponseDTO?> LoginAccountAsync(LoginUserDTO loginUserDTO);
        Task<TokenResponseDTO?> RefreshTokenAsync(Guid id);
    }
}
