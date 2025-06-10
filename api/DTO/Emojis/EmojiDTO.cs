using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Emojis
{
    public class EmojiDTO
    {
        public int EmojiId { get; set; }

        public string EmojiSymbol { get; set; } = string.Empty;

        public string? EmojiText { get; set; } = string.Empty;
    }
}
