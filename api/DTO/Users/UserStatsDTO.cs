using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.Users
{
    public class UserStatsDTO
    {
        public int TotalCount { get; set; }
        public int UserCount { get; set; }
        public int AdminCount { get; set; }
        public int ModCount { get; set; }
    }
}
