using System;
using System.Linq;
using System.Threading.Tasks;
using Microsoft.EntityFrameworkCore;
using TicketManagement.API.Data;
using TicketManagement.API.DTOs;
using TicketManagement.API.Models;

namespace TicketManagement.API.Services
{
    public class TicketServiceImplementation : TicketServiceInterface
    {
        private readonly ApplicationDbContext _context;

        public TicketServiceImplementation(ApplicationDbContext context)
        {
            _context = context;
        }

        public async Task<PaginatedResult<Ticket>> GetTicketsAsync(int pageNumber, int pageSize, string sortBy, string sortOrder, string filterBy)
        {
            IQueryable<Ticket> query = _context.Tickets;

            if (!string.IsNullOrEmpty(filterBy))
            {
                query = query.Where(t =>
                    t.Description.Contains(filterBy) ||
                    t.Status.Contains(filterBy) ||
                    t.Date.ToString().Contains(filterBy));
            }

            if (!string.IsNullOrEmpty(sortBy))
            {
                switch (sortBy.ToLower())
                {
                    case "id":
                        query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(t => t.Id) : query.OrderBy(t => t.Id);
                        break;
                    case "description":
                        query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(t => t.Description) : query.OrderBy(t => t.Description);
                        break;
                    case "status":
                        query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(t => t.Status) : query.OrderBy(t => t.Status);
                        break;
                    case "date":
                        query = sortOrder.ToLower() == "desc" ? query.OrderByDescending(t => t.Date) : query.OrderBy(t => t.Date);
                        break;
                    default:
                        query = query.OrderBy(t => t.Id);
                        break;
                }
            }
            else
            {
                query = query.OrderBy(t => t.Id);
            }

            var totalCount = await query.CountAsync();

            var items = await query
                .Skip((pageNumber - 1) * pageSize)
                .Take(pageSize)
                .ToListAsync();

            return new PaginatedResult<Ticket>
            {
                Items = items,
                TotalCount = totalCount,
                PageNumber = pageNumber,
                PageSize = pageSize
            };
        }

        public async Task<Ticket?> GetTicketByIdAsync(int id)
        {
            return await _context.Tickets.FindAsync(id);
        }

        public async Task<Ticket> CreateTicketAsync(Ticket ticket)
        {
            _context.Tickets.Add(ticket);
            await _context.SaveChangesAsync();
            return ticket;
        }

        public async Task<Ticket?> UpdateTicketAsync(Ticket ticket)
        {
            var existingTicket = await _context.Tickets.FindAsync(ticket.Id);
            if (existingTicket == null)
            {
                return null;
            }

            existingTicket.Description = ticket.Description;
            existingTicket.Status = ticket.Status;
            existingTicket.Date = ticket.Date;

            await _context.SaveChangesAsync();
            return existingTicket;
        }

        public async Task<bool> DeleteTicketAsync(int id)
        {
            var ticket = await _context.Tickets.FindAsync(id);
            if (ticket == null)
            {
                throw new KeyNotFoundException("Ticket not found");
            }

            _context.Tickets.Remove(ticket);
            await _context.SaveChangesAsync();
            return true;
        }
    }
}