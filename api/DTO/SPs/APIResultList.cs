using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;

namespace api.DTO.SPs
{
    public class APIResultList<T>
    {
        public int StatusCode { get; set; }
        public string? Message { get; set; } = string.Empty;
        public bool IsSuccess { get; set; }
        public List<T>? Payload { get; set; }

        
    }
}