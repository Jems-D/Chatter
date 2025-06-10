using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Emojis;

namespace api.Interface
{
    public interface IEmojiRepository
    {
        Task<List<EmojiDTO?>> GetAllEmojis();
    }
}
