using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Emojis;
using api.Model;

namespace api.Mappers.Emojis
{
    public static class EmojiMappers
    {
        public static EmojiDTO ToEmojiDTOFromEmoji(this Emoji emoji)
        {
            return new EmojiDTO
            {
                EmojiId = emoji.EmojiId,
                EmojiSymbol = emoji.EmojiSymbol,
                EmojiText = emoji.EmojiText,
            };
        }
    }
}
