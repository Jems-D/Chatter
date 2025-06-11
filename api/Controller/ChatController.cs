using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Chats;
using api.Extensions;
using api.Interface;
using api.Mappers.Chats;
using api.Repository;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Authorization.Infrastructure;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Infrastructure;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controller
{
    [ApiVersion("1.0")]
    [ApiVersion("2.0")]
    [ApiController]
    [Route("v{version:apiVersion}/chats")]
    [EnableRateLimiting("UserPolicy")]
    public class ChatController : ControllerBase
    {
        private readonly IChatRepository _repoChat;

        public ChatController(IChatRepository repoChat)
        {
            _repoChat = repoChat;
        }

        [HttpGet]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> GetAllChatsEndpoint()
        {
            var chats = await _repoChat.GetAllChats();
            if (chats == null)
                return Ok("There are currently no chats available");
            return Ok(chats);
        }

        [HttpGet]
        [MapToApiVersion("2.0")]
        public async Task<IActionResult> GetAllChatsEndpointV2()
        {
            var chats = await _repoChat.GetAllChats();
            if (chats == null)
                return Ok("There are currently no chats available");
            return Ok(chats);
        }

        [HttpPost]
        [MapToApiVersion("1.0")]
        [Authorize(Roles = "User")]
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
                return StatusCode(500, "Something went wrong");
            }
            return Ok(insertedChat);
        }
    }
}
