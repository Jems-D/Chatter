using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore.Metadata.Internal;

namespace api.Model
{
    public class Chat
    {
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

        [Column("created_by_id")]
        public Guid CreatedById { get; set; }

        [Column("is_disabled")]
        public bool isDisabled { get; set; } = false;
    }
}
