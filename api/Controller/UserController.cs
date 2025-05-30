using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    public class UserController : ControllerBase
    {

        public UserController()
        {

        }

        [HttpGet]
        [Route("try")]
        public async Task<IActionResult> Hello()
        {
            return Ok("Good Evening");
        }

    }
}