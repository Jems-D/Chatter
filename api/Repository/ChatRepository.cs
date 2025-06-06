using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Chats;
using api.Interface;
using api.Mappers.Chats;
using api.Model;

namespace api.Repository
{
    public class ChatRepository : IChatRepository
    {
        private readonly ApplicationDbContext _context;

        public ChatRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<ChatDTO?> CreateChat(Chat chat)
        {
            var insertedChat = await _context.InsertChatAsync(chat);
            if (!insertedChat.IsSuccess)
            {
                return null;
            }
            return insertedChat.Payload.ToChatDTOFromChat();
        }

        public async Task<List<ChatDTO?>> GetAllChats()
        {
            var result = await _context.GetAllChatsAsync();

            if (!result.IsSuccess)
            {
                return null;
            }
            return result?.Payload?.Select(s => s.ToChatDTOFromChat()).ToList()!;
        }
    }
}
