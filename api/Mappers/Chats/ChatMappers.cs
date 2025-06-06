using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;
using api.Model;

namespace api.Mappers.Chats
{
    public static class ChatMappers
    {
        /// <summary>
        /// Transforms Chat into ChatDTO for displaying purposes
        /// </summary>
        /// <param name="chat"></param>
        /// <returns></returns>
        public static ChatDTO ToChatDTOFromChat(this Chat chat)
        {
            return new ChatDTO
            {
                id = chat.id,
                ChatContent = chat.ChatContent,
                ChatTitle = chat.ChatTitle,
                CreatedAt = chat.CreatedAt,
                CreatedBy = chat.CreatedBy,
            };
        }

        public static Chat ToChatFromCreate(this CreateChatDTO dto, String username, Guid userId)
        {
            return new Chat
            {
                ChatTitle = dto.ChatTitle,
                ChatContent = dto.ChatContent,
                CreatedBy = username,
                CreatedById = userId,
            };
        }
    }
}
