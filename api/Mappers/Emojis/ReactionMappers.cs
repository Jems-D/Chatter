using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;
using api.DTO.Reactions;
using api.Model;

namespace api.Mappers.Emojis
{
    public static class ReactionMappers
    {
        /// <summary>
        /// Transforms the create reaction dto to reaction model
        /// </summary>
        /// <param name="dto"></param>
        /// <param name="userId"></param>
        /// <returns></returns>
        public static Reaction ToCreateReactFromDTO(this CreateReactionDTO dto, Guid userId)
        {
            return new Reaction
            {
                ChatId = dto.ChatId,
                UserId = userId,
                EmojiId = dto.EmojiId,
            };
        }
    }
}
