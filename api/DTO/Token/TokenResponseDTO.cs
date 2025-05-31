using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Token
{
    public class TokenResponseDTO
    {
        public string AccessToken { get; set; } = string.Empty;
        public string RefreshToken { get; set; } = string.Empty;
        public string Username { get; set; } = string.Empty;
        public string EmailAddress { get; set; } = string.Empty;
        public string Role { get; set; } = string.Empty;
        public Guid Id { get; set; }
    }
}
