using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.SPs
{
    public class APIResult<T>
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; } = string.Empty;
        public bool IsSuccess { get; set; }
        public T? Payload { get; set; }
        
    }
}