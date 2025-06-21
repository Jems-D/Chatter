using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Users
{
    public class ChangeRoleDTO
    {
        [Required]
        [MaxLength(15, ErrorMessage = "Role too long")]
        public string? NewRole { get; set; }
    }
}
