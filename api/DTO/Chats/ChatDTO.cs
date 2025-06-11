using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Reactions;

namespace api.DTO.Chats
{
    public class ChatDTO
    {
        public int id { get; set; }
        public string? ChatTitle { get; set; } = string.Empty;
        public string? ChatContent { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public string? CreatedBy { get; set; } = string.Empty;
        public Guid CreatedById { get; set; }
        public List<ReactionDTO> Reactions { get; set; } = new List<ReactionDTO>();
    }
}
