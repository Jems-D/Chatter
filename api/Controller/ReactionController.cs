using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Reactions;
using api.Extensions;
using api.Interface;
using api.Mappers.Emojis;
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
    [Authorize(Roles = "User")]
    [EnableRateLimiting("UserPolicy")]
    public class ReactionController : ControllerBase
    {
        private readonly IReactionRepository _repoReaction;

        public ReactionController(IReactionRepository repoRepository)
        {
            _repoReaction = repoRepository;
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
            return Created();
        }
    }
}
