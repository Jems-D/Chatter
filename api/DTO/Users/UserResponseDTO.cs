using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Users
{
    public class UserResponseDTO
    {
        public Guid Id { get; set; }
        public string? Username { get; set; }
        public string? Role { get; set; }
        public string? EmailAddress { get; set; }
    }
}
