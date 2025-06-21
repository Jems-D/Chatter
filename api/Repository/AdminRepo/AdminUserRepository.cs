using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Users;
using api.Helpers;
using api.Interface;
using api.Mappers.Users;
using api.Model;

namespace api.Repository.AdminRepo
{
    public class AdminUserRepository : IAdminUserRepository
    {
        private readonly ApplicationDbContext _context;

        public AdminUserRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<int?> ChangeUserRole(Guid id, string newRole)
        {
            var result = await _context.ChangeUserRoleAsync(id, newRole);
            if (!result.IsSuccess)
                return null;
            if (result.Payload == 0)
                return null;
            return result.Payload;
        }

        public async Task<List<UserDTO?>> GetAllUsers()
        {
            var result = await _context.GetAllUsersAsync();
            if (result.Payload is null)
                return null;
            return result.Payload.Select(s => s.ToUserDTOFromUser()).ToList();
        }
    }
}
