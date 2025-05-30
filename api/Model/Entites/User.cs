using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;

namespace api.Model
{
    public class User
    {
        [Key]
        [Column("Id")]
        public Guid Id { get; set; }
        [Column("Name")]
        public string UserName { get; set; } = string.Empty;
        [Column("PasswordHash")]
        public string PasswordHash { get; set; } = string.Empty;
        [Column("Role")]
        public string Role { get; set; } = string.Empty;
        [Column("RefreshToken")]
        public string RefreshToken { get; set; } = string.Empty;
        [Column("RefreshTokenExpiryDate")]
        public DateTime RefreshTokenExpiryDate { get; set; } = DateTime.Now;
    }
}