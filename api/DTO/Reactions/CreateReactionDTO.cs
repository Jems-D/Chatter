using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Reactions
{
    public class CreateReactionDTO
    {
        [Required]
        public int EmojiId { get; set; }

        [Required]
        public int ChatId { get; set; }
    }
}
