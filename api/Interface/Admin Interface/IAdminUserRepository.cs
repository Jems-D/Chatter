using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Users;
using api.Helpers;

namespace api.Interface
{
    public interface IAdminUserRepository
    {
        Task<List<UserDTO?>> GetAllUsers();
        Task<int?> ChangeUserRole(Guid id, string newRole);
    }
}
