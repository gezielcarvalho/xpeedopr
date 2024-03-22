using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;
[Route("api/[controller]")]
[ApiController]
public class AuthController : ControllerBase
{
    private static User user = new();
    private readonly IConfiguration _configuration;
    
    public AuthController(IConfiguration configuration)
    {
        _configuration = configuration;
    }
    
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
            var token = GenerateJwtToken(user);
            return Ok(new { token });
        }
        return Unauthorized();
    }
    
    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var value = _configuration.GetSection("AppSettings:Secret").Value;
        var lifeTime = _configuration.GetSection("AppSettings:TokenLifeTime").Value;
        if (value != null)
        {
            var key = new SymmetricSecurityKey(
                Encoding.UTF8.GetBytes(value));
            var cred = new SigningCredentials(key, SecurityAlgorithms.HmacSha512Signature);
            var token = new JwtSecurityToken(
                claims: claims,
                expires: DateTime.Now.AddMinutes(Convert.ToDouble(lifeTime)),
                signingCredentials: cred
            );
            var jwt = new JwtSecurityTokenHandler().WriteToken(token);
            return jwt;
        }
        else
        {
            throw new Exception("Secret key is missing");
        }
        
    }
    
}