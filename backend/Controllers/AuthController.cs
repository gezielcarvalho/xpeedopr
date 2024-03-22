using System.IdentityModel.Tokens.Jwt;
using System.Security.Claims;
using System.Text;
using backend.Models;
using Microsoft.AspNetCore.Mvc;
using Microsoft.IdentityModel.Tokens;

namespace backend.Controllers;

[Route("api/[controller]")]
[ApiController]
public class AuthController(IConfiguration configuration) : ControllerBase
{
    private static User _user = new();

    [HttpPost("register")]
    public ActionResult<User> Register(UserDto request)
    {
        var passwordHash = BCrypt.Net.BCrypt.HashPassword(request.Password);
        
        _user.Username = request.Username;
        _user.HashPassword = passwordHash;
        return Ok(_user);
    }
    
    [HttpPost("login")]
    public ActionResult<User> Login(UserDto request)
    {
        if (_user.Username != request.Username || !BCrypt.Net.BCrypt.Verify(request.Password, _user.HashPassword))
            return Unauthorized();
        var token = GenerateJwtToken(_user);
        return Ok(new { token });
    }
    
    private string GenerateJwtToken(User user)
    {
        var claims = new List<Claim>
        {
            new Claim(ClaimTypes.Name, user.Username)
        };

        var value = configuration.GetSection("AppSettings:Secret").Value;
        var lifeTime = configuration.GetSection("AppSettings:TokenLifeTime").Value;
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