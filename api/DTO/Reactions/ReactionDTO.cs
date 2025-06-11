using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Emojis;
using api.Model;

namespace api.DTO.Reactions
{
    public class ReactionDTO
    {
        public int ReactionId { get; set; }
        public int ChatId { get; set; }
        public Guid UserId { get; set; }
        public int EmojiId { get; set; }
        public EmojiDTO Emojis { get; set; } = new EmojiDTO();
    }
}
