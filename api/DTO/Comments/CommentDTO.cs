using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Model;

namespace api.DTO.Comments
{
    public class CommentDTO
    {
        public int CommentId { get; set; }
        public Guid CreatedById { get; set; }
        public int ChatId { get; set; }
        public string? Content { get; set; } = string.Empty;
        public DateTime CreatedAt { get; set; } = DateTime.UtcNow;
        public Boolean IsDisabled { get; set; } = false;
        public string? Username { get; set; } = string.Empty;
    }
}
