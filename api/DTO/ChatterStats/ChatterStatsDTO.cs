using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.ChatterStats
{
    public class ChatterStatsDTO
    {
        public int ChatCount { get; set; }
        public int CommentCount { get; set; }
        public int ReactionCount { get; set; }
    }
}
