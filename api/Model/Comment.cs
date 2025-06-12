using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    [Table("Comments")]
    public class Comment
    {
        [Key]
        [Column("comment_id")]
        public int CommentId { get; set; }

        [Column("user_id")]
        public Guid CreatedById { get; set; }

        [Column("chat_id")]
        public int ChatId { get; set; }

        [Column("content")]
        public string? Content { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.Now;

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; } = DateTime.UtcNow;

        [Column("is_disabled")]
        public Boolean IsDisabled { get; set; } = false;

        public User User { get; set; } = new User();
    }
}
