using System.Threading.Tasks;
using TicketManagement.API.DTOs;
using TicketManagement.API.Models;

namespace TicketManagement.API.Services
{
    public interface TicketServiceInterface
    {
        Task<PaginatedResult<Ticket>> GetTicketsAsync(int pageNumber, int pageSize, string sortBy, string sortOrder, string filterBy);
        Task<Ticket?> GetTicketByIdAsync(int id);
        Task<Ticket> CreateTicketAsync(Ticket ticket);
        Task<Ticket?> UpdateTicketAsync(Ticket ticket);
        Task<bool> DeleteTicketAsync(int id);
    }
}