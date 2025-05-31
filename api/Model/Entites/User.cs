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
        [Column("user_id")]
        public Guid Id { get; set; }
        [Column("user_name")]
        public string? UserName { get; set; } = string.Empty;
        [Column("email_add")]
        public string? EmailAddress { get; set; } = string.Empty;
        [Required]
        [Column("password_hash")]
        public string? PasswordHash { get; set; } = string.Empty;
        [Required]
        [Column("user_role")]
        public string? Role { get; set; } = string.Empty;
        [Column("refresh_token")]
        public string? RefreshToken { get; set; } = string.Empty;
        [Column("rt_expiry_date")]
        public DateTime? RefreshTokenExpiryDate { get; set; } = DateTime.Now;
        [Column("created_at")]
        public DateTime? CreatedAt { get; set; } = DateTime.UtcNow;
        [Column("updated_at")]
        public DateTime? UpdatedAt { get; set; } = DateTime.UtcNow;
    }
}