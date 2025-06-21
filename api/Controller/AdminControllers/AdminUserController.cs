using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using api.Helpers;
using api.Interface;
using api.Model;
using Asp.Versioning;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore.Storage.ValueConversion.Internal;

namespace api.Controller.AdminControllers
{
    [ApiVersion("1.0")]
    [ApiController]
    [Route("v{version:apiVersion}/admin/users")]
    //[Authorize(Roles = "Admin")]
    public class AdminUserController : ControllerBase
    {
        private readonly IAdminUserRepository _repoAdminUser;

        public AdminUserController(IAdminUserRepository repoAdminUser)
        {
            _repoAdminUser = repoAdminUser;
        }

        [HttpGet]
        public async Task<IActionResult> GetAllUsersEndpoint()
        {
            var users = await _repoAdminUser.GetAllUsers();
            if (users is null)
                return BadRequest("No users available");
            return Ok(users);
        }

        [HttpPatch("{id:string}")]
        public async Task<IActionResult> ChangeUserRoleEndpoint(
            [FromRoute] string id,
            [FromBody] string newRole
        )
        {
            if (!ModelState.IsValid)
            {
                return BadRequest("User role not valid");
            }
            var userId = Guid.Parse(id);
            var updatedRole = await _repoAdminUser.ChangeUserRole(userId, newRole);
            if (updatedRole is null)
            {
                return BadRequest("User not updated");
            }
            return NoContent();
        }
    }
}
