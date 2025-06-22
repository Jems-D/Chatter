using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.ChatterStats;
using api.Interface;
using api.Service;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller.AdminControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("v{version:apiVersion}/admin/stats")]
    [Authorize(Roles = "Admin")]
    public class StatsController : ControllerBase
    {
        private readonly IAdminUserRepository _repoAdminUser;

        public StatsController(IAdminUserRepository repoAdminUser)
        {
            _repoAdminUser = repoAdminUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllStatsEndpoint()
        {
            var userStats = await _repoAdminUser.GetUserStats();
            var chatterState = await _repoAdminUser.GetChatterStats();

            var stats = new StatsDTO
            {
                TotalUserCount = userStats.TotalCount,
                UserCount = userStats.UserCount,
                AdminCount = userStats.AdminCount,
                ModCount = userStats.ModCount,
                ChatCount = chatterState.ChatCount,
                ReactionCount = chatterState.ReactionCount,
                CommentCount = chatterState.CommentCount,
            };

            return Ok(stats);
        }
    }
}
