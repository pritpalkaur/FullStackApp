using Microsoft.AspNetCore.Mvc;
using webAPI.Auth;
using webAPI.Data.Entities;

namespace webAPI.Controllers
{
    [ApiController]
    [Route("api/[controller]")]
    public class AuthController : ControllerBase
    {
        private readonly ITokenService _tokenService;

        public AuthController(ITokenService tokenService)
        {
            _tokenService = tokenService;
        }

        [HttpPost("login")]
        public IActionResult Login(string username, string password)
        {
            // Hardcoded user for demo — replace with DB lookup
            if (username == "admin" && password == "admin123")
            {
                var user = new User { Username = username };
                var token = _tokenService.CreateToken(user);
                return Ok(new { token });
            }

            return Unauthorized("Invalid credentials");
        }
    }
}