using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.ChatterStats
{
    public class StatsDTO
    {
        public int TotalUserCount { get; set; }
        public int UserCount { get; set; }
        public int AdminCount { get; set; }
        public int ModCount { get; set; }
        public int ChatCount { get; set; }
        public int CommentCount { get; set; }
        public int ReactionCount { get; set; }
    }
}
