using System.ComponentModel.DataAnnotations;

namespace TicketManagement.API.DTOs;
public class CreateTicketDto
{
    [Required]
    [StringLength(200)]
    public string Description { get; set; } = string.Empty;

    [Required]
    public string Status { get; set; } = string.Empty;

    public DateTime Date { get; set; }
}