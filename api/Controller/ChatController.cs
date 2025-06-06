using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Interface;
using api.Repository;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    [Authorize(Roles = "User")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _repoChat;

        public ChatController(IChatRepository repoChat)
        {
            _repoChat = repoChat;
        }

        [HttpGet]
        [Route("chats")]
        public async Task<IActionResult> GetAllChatsEndpoint()
        {
            var chats = await _repoChat.GetAllChats();
            if (chats == null)
                return BadRequest("There are currently no chats available");
            return Ok(chats);
        }
    }
}
