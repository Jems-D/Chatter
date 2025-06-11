using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Reactions;
using api.Mappers.Emojis;
using api.Model;

namespace api.Mappers.Reactions
{
    public static class ReactionMappers
    {
        public static ReactionDTO ToReactionDTOFromReaction(this Reaction reaction)
        {
            return new ReactionDTO
            {
                ReactionId = reaction.ReactionId,
                ChatId = reaction.ChatId,
                UserId = reaction.UserId,
                EmojiId = reaction.EmojiId,
                Emojis = reaction.Emoji.ToEmojiDTOFromEmoji(),
            };
        }
    }
}
