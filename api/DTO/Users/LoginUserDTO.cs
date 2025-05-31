using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Users
{
    public class LoginUserDTO
    {
        [Required]
        public string EmailAddress { get; set; } = string.Empty;
        [Required]
        public string Password { get; set; } = string.Empty;
    }
}