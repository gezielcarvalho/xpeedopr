using backend.Models;
using Microsoft.AspNetCore.Mvc;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    public static User user = new User();
    
    [HttpPost("register")]
    public ActionResult<User> Register(UserDto request)
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        
        user.Username = request.Username;
        user.HashPassword = passwordHash;
        return Ok(user);
    }
    
}