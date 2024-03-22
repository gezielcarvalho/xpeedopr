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
    
    [HttpPost("login")]
    public ActionResult<User> Login(UserDto request)
    {
        if (user.Username == request.Username && BCrypt.Net.BCrypt.Verify(request.Password, user.HashPassword))
        {
            return Ok(user);
        }
        return Unauthorized();
    }
    
}