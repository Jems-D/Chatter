using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Comments
{
    public class CreateCommentDTO
    {
        [Required]
        [MinLength(10, ErrorMessage = "Content too short")]
        [MaxLength(200, ErrorMessage = "Content too long")]
        public string? Content { get; set; } = string.Empty;
    }
}
