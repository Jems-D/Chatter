using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Reactions;
using api.Extensions;
using api.Interface;
using api.Mappers.Emojis;
using api.Service;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Http.HttpResults;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controller
{
    [ApiController]
    [ApiVersion("1.0")]
    [Route("v{version:apiVersion}/reactions")]
    [Authorize(Roles = "User, Moderator, Admin")]
    [EnableRateLimiting("UserPolicy")]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _repoReaction;
        private readonly StatsService _statsService;

        public ReactionController(IReactionRepository repoRepository, StatsService statsService)
        {
            _repoReaction = repoRepository;
            _statsService = statsService;
        }

        [HttpPost]
        [MapToApiVersion("1.0")]
        public async Task<IActionResult> InsertReactionEndpoint([FromBody] CreateReactionDTO dto)
        {
            var user = User.GetUserId();
            var createReact = dto.ToCreateReactFromDTO((Guid)user);

            var reaction = await _repoReaction.InsertReaction(createReact);
            if (reaction == null)
                return BadRequest("Reaction not added");
            await _statsService.BroadCastAsync();
            return Created();
        }

        [HttpDelete("{reactionId:int}")]
        [MapToApiVersion("1.00")]
        public async Task<IActionResult> DeleteReactionEndpoint([FromRoute] int reactionId)
        {
            var results = await _repoReaction.DeleteReaction(reactionId);
            if (results is null)
                return BadRequest("Reaction not removed");
            await _statsService.BroadCastAsync();
            return NoContent();
        }
    }
}
