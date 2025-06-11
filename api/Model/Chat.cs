using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Model
{
    [Table("Chats")]
    public class Chat
    {
        [Key]
        [Column("chat_id")]
        public int id { get; set; }

        [Required]
        [Column("chat_title")]
        public string? ChatTitle { get; set; } = string.Empty;

        [Column("chat_content")]
        public string? ChatContent { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Column("created_by_name")]
        public string? CreatedBy { get; set; } = string.Empty;

        [Column("user_id")]
        public Guid CreatedById { get; set; }

        [Column("is_disabled")]
        public bool isDisabled { get; set; } = false;

        public List<Comment> Comments { get; set; } = new List<Comment>();
        public List<Reaction> Reactions { get; set; } = new List<Reaction>();
    }
}
