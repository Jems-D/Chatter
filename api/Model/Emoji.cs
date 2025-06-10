using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    [Table("Emojis")]
    public class Emoji
    {
        [Key]
        [Column("emoji_id")]
        public int EmojiId { get; set; }

        [Column("emoji_symbol")]
        public string? EmojiSymbol { get; set; } = string.Empty;

        [Column("emoji_text")]
        public string? EmojiText { get; set; } = string.Empty;

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
