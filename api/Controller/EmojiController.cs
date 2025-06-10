using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interface;
using api.Repository;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/emojis")]
    public class EmojiController : ControllerBase
    {
        private readonly IEmojiRepository _repoEmoji;

        public EmojiController(IEmojiRepository repoEmoji)
        {
            _repoEmoji = repoEmoji;
        }

        [HttpGet]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllEmojisEndpoint()
        {
            var emojis = await _repoEmoji.GetAllEmojis();
            if (emojis == null)
            {
                return BadRequest("No emojis");
            }
            return Ok(emojis);
        }
    }
}
