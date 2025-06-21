using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.Helpers
{
    public class UserQuery
    {
        public string? Username { get; set; } = string.Empty;
        public string? EmailAddress { get; set; } = string.Empty;
        public string? SortBy { get; set; } = "user_id";
        public bool IsDescending { get; set; } = false;
        public int PageNumber { get; set; } = 1;
        public int PageSize { get; set; } = 30;
    }
}
