using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;
using api.Extensions;
using api.Interface;
using api.Mappers.Chats;
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

        [HttpPost]
        [Route("chats/create")]
        public async Task<IActionResult> CreateChat(CreateChatDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var username = User.GetUsername();
            var userId = User.GetUserId();
            if (userId == null)
            {
                return NotFound("No user id");
            }
            var chat = dto.ToChatFromCreate(username, (Guid)userId);
            var insertedChat = await _repoChat.CreateChat(chat);
            if (insertedChat == null)
            {
                return BadRequest("Insert operation unsuccessful");
            }
            return Ok(insertedChat);
        }
    }
}
