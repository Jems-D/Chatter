using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Data;
using api.DTO.Users;
using api.Interface;
using api.Mappers.Users;
using api.Model.Entites;
using api.Service;
using Asp.Versioning;
using Microsoft.AspNetCore.Authentication;
using Microsoft.AspNetCore.CookiePolicy;
using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.RateLimiting;

namespace api.Controller
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("v{version:apiVersion}/auth")]
    [EnableRateLimiting("UserPolicy")]
    public class UserController : ControllerBase
    {
        private readonly IUserRepository _repoUser;
        private readonly StatsService _statsService;

        public UserController(IUserRepository repoUser, StatsService statsService)
        {
            _repoUser = repoUser;
            _statsService = statsService;
        }

        [HttpPost]
        [MapToApiVersion("1.0")]
        [Route("register")]
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
            await _statsService.BroadCastAsync();
            return Created();
        }

        [HttpPost]
        [MapToApiVersion("1.0")]
        [Route("login")]
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
        [MapToApiVersion("1.0")]
        [Route("refresh-token")]
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
        [MapToApiVersion("1.0")]
        [Route("logout")]
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
