using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.DTO.Users;
using api.Helpers;
using api.Interface;
using api.Model;
using api.Service;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace api.Controller.AdminControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("v{version:apiVersion}/admin/users")]
    [Authorize(Roles = "Admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly IAdminUserRepository _repoAdminUser;
        private readonly StatsService _statsService;

        public AdminUserController(IAdminUserRepository repoAdminUser, StatsService statsService)
        {
            _repoAdminUser = repoAdminUser;
            _statsService = statsService;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersEndpoint()
        {
            var users = await _repoAdminUser.GetAllUsers();
            if (users is null)
                return BadRequest("No users available");
            return Ok(users);
        }

        [HttpPatch("{id:guid}")]
        public async Task<IActionResult> ChangeUserRoleEndpoint(
            [FromRoute] Guid id,
            [FromBody] ChangeRoleDTO newRole
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("User role not valid");
            }
            var updatedRole = await _repoAdminUser.ChangeUserRole(id, newRole);
            if (updatedRole is null)
            {
                return BadRequest("User not updated");
            }

            await _statsService.BroadCastAsync();
            return NoContent();
        }
    }
}
