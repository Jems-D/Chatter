using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.ComponentModel.DataAnnotations.Schema;
using System.Linq;
using System.Threading.Tasks;

namespace api.Model
{
    [Table("ChatReactions")]
    public class Reaction
    {
        [Key]
        [Column("reaction_id")]
        public int ReactionId { get; set; }

        [Column("chat_id")]
        public int ChatId { get; set; }

        [Column("user_id")]
        public Guid UserId { get; set; }

        [Column("emoji_id")]
        public int EmojiId { get; set; }

        [Column("created_at")]
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
    }
}
