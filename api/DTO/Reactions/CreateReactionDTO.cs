using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Reactions
{
    public class CreateReactionDTO
    {
        public int EmojiId { get; set; }
        public int ChatId { get; set; }
    }
}
