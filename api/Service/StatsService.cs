using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.ChatterStats;
using api.Interface;
using api.SignalRHub;
using Microsoft.AspNetCore.SignalR;

namespace api.Service
{
    public class StatsService
    {
        private readonly IHubContext<StatsHub> _hub;
        private readonly IAdminUserRepository _repoAdminUser;

        public StatsService(IHubContext<StatsHub> hub, IAdminUserRepository repoAdminUser)
        {
            _hub = hub;
            _repoAdminUser = repoAdminUser;
        }

        public async Task BroadCastAsync()
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

            await _hub.Clients.Group("Admins").SendAsync("RecievedStats", stats);
        }
    }
}
