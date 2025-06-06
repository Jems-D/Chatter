using System;
using System.Collections.Generic;
using System.ComponentModel;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Chats
{
    public class CreateChatDTO
    {
        [Required]
        [MinLength(10, ErrorMessage = "Title too short")]
        [MaxLength(100, ErrorMessage = "Title too long")]
        public string? ChatTitle { get; set; } = string.Empty;

        [Required]
        [MinLength(50, ErrorMessage = "Content too short")]
        [MaxLength(500, ErrorMessage = "Content too long")]
        public string? ChatContent { get; set; } = string.Empty;
    }
}
