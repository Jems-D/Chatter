using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model.Entites
{
    public class CreateUserDTO
    {
        [Required]
        [MinLength(4, ErrorMessage = "Username too short")]
        [MaxLength(30, ErrorMessage = "Username too long")]
        public string Username { get; set; } = string.Empty;

        [Required]
        [MaxLength(50, ErrorMessage = "Email address too long")]
        public string EmailAddress { get; set; } = string.Empty;

        [Required]
        [MinLength(8, ErrorMessage = "Not enough security")]
        public string Password { get; set; } = string.Empty;
    }
}
