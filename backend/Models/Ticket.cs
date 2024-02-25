namespace backend.Models;
using Microsoft.AspNetCore.Identity;

public class Ticket
{
    public int Id { get; set; }
    public string Title { get; set; } = default!;
    public string Description { get; set; } = default!;
    public string Status { get; set; } = default!;
    public DateTime Created { get; set; }
    public DateTime Updated { get; set; }
    public DateTime? Closed { get; set; }
    // Other properties...

    // Foreign key relationship to Customer (AspNetUsers table/entity)
    public string CustomerId { get; set; } = default!;
    public IdentityUser Customer { get; set; } = default!;
    
    // Foreign key relationship to Employee (AspNetUsers table/entity)
    public string? TechnicianId { get; set; } = default!;
    public IdentityUser? Technician { get; set; } = default!;
}
