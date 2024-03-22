namespace backend.Models;

public class User
{
    public int Id { get; set; }
    public string Username { get; set; } = String.Empty;
    public string HashPassword { get; set; } = String.Empty;
    public string EmailAddress { get; set; } = String.Empty;
}