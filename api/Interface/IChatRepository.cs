using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;
using api.Model;

namespace api.Interface
{
    public interface IChatRepository
    {
        Task<List<ChatDTO?>> GetAllChats();
        Task<ChatDTO?> CreateChat(Chat chat);
        Task<bool?> DeletChat(int chatId);
    }
}
