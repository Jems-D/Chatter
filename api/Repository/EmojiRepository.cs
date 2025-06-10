using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Emojis;
using api.Interface;
using api.Mappers.Chats;
using api.Mappers.Emojis;

namespace api.Repository
{
    public class EmojiRepository : IEmojiRepository
    {
        private readonly ApplicationDbContext _context;

        public EmojiRepository(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<List<EmojiDTO?>> GetAllEmojis()
        {
            var emojis = await _context.GetAllEmojisAsync();
            if (!emojis.IsSuccess)
                return null;

            return emojis?.Payload?.Select(s => s.ToEmojiDTOFromEmoji()).ToList()!;
        }
    }
}
