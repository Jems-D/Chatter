using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Users;
using api.Interface;
using api.Mappers.Users;
using api.Model.Entites;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;

namespace api.Controller
{
    [ApiController]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repoUser;

        public UserController(IUserRepository repoUser)
        {
            _repoUser = repoUser;
        }

        [HttpPost]
        [Route("auth/register")]
        public async Task<IActionResult> RegitserAccountEndpoint([FromBody] CreateUserDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }

            var registeredUser = await _repoUser.RegisterAccountAsync(dto);

            if (registeredUser == null)
            {
                return Conflict("Username or email already exists");
            }
            return Created();
        }

        [HttpPost]
        [Route("auth/login")]
        public async Task<IActionResult> LoginAccountEndpoint([FromBody] LoginUserDTO dto)
        {
            if (!ModelState.IsValid)
            {
                return BadRequest(ModelState);
            }
            var user = await _repoUser.LoginAccountAsync(dto);
            if (user == null)
                return BadRequest("Invalid credentials");

            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                Secure = true,
                SameSite = SameSiteMode.None,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("authToken", user.AccessToken, cookieOptions);

            return Ok(user.ToUserResponseFromTokenResponse());
        }

        [HttpPost]
        [Route("auth/refresh-token")]
        public async Task<IActionResult> RefreshTokenEndpoint([FromBody] Guid id)
        {
            var user = await _repoUser.RefreshTokenAsync(id);
            if (user == null)
            {
                return Unauthorized("Session expired");
            }
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(7),
            };

            Response.Cookies.Append("authToken", user.AccessToken, cookieOptions);

            return Ok(user.ToUserResponseFromTokenResponse());
        }

        [HttpPost]
        [Route("auth/logout")]
        public IActionResult LogoutEndpoint()
        {
            var cookieOptions = new CookieOptions
            {
                HttpOnly = true,
                SameSite = SameSiteMode.None,
                Secure = true,
                Expires = DateTime.UtcNow.AddDays(-1),
            };

            Response.Cookies.Append("authToken", "", cookieOptions);
            return Ok();
        }
    }
}
