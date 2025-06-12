using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Comments;
using api.Extensions;
using api.Interface;
using api.Mappers.Comments;
using api.Model;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controller
{
    [ApiController]
    [ApiVersion("1.0")]
    [Authorize(Roles = "User")]
    [Route("v{version:apiVersion}/comments")]
    [EnableRateLimiting("UserPolicy")]
    public class CommentController : ControllerBase
    {
        private readonly ICommentRepository _repoComment;

        public CommentController(ICommentRepository repoComment)
        {
            _repoComment = repoComment;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllCommentsEndpoint([FromQuery] int? chatId)
        {
            var comments = await _repoComment.GetAllComments(chatId);
            if (comments is null)
                return BadRequest("No comments available");
            return Ok(comments);
        }

        [HttpPost("{chatId:int}")]
        public async Task<IActionResult> CreateCommentEndpoint(
            [FromRoute] int chatId,
            [FromBody] CreateCommentDTO dto
        )
        {
            var userId = User.GetUserId();
            var comment = dto.ToCommentFromCreateCommentDTO(chatId, (Guid)userId);
            var createdCommentId = await _repoComment.CreateComment(comment);
            if (createdCommentId is null)
                return BadRequest("Comment not created");

            return Ok(createdCommentId);
        }
    }
}
