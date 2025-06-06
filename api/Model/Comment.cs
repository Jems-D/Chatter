using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
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
        [MaxLength(100, ErrorMessage = "Comment too long")]
        public string? Content { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; }

        [Column("updated_at")]
        public DateTime UpdatedAt { get; set; }

        [Column("is_disabled")]
        public Boolean IsDisabled { get; set; } = false;
    }
}
