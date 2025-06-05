using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;

namespace api.Interface
{
    public interface IChatRepository
    {
        Task<List<ChatDTO?>> GetAllChats();
    }
}
