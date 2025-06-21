using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Users
{
    public class UserDTO
    {
        public Guid UserId { get; set; }
        public string? Username { get; set; } = string.Empty;
        public string? UserRole { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; }
        public DateTime UpdatedAt { get; set; }
    }
}
