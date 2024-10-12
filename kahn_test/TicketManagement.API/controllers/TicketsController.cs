using Microsoft.AspNetCore.Mvc;
using System.Threading.Tasks;
using TicketManagement.API.DTOs;
using TicketManagement.API.Models;
using TicketManagement.API.Services;

namespace TicketManagement.API.Controllers
{
    [Route("api/[controller]")]
    [ApiController]
    public class TicketsController : ControllerBase
    {
        private readonly TicketServiceInterface _ticketService;

        public TicketsController(TicketServiceInterface ticketService)
        {
            _ticketService = ticketService;
        }

        [HttpGet]
        public async Task<IActionResult> GetTickets([FromQuery] int pageNumber = 1, [FromQuery] int pageSize = 10, 
            [FromQuery] string sortBy = "Id", [FromQuery] string sortOrder = "asc", [FromQuery] string filterBy = "")
        {
            var result = await _ticketService.GetTicketsAsync(pageNumber, pageSize, sortBy, sortOrder, filterBy);
            return Ok(result);
        }

        [HttpGet("{id}")]
        public async Task<IActionResult> GetTicket(int id)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            return Ok(ticket);
        }

        [HttpPost]
        public async Task<IActionResult> CreateTicket([FromBody] CreateTicketDto ticketDto)
        {
            var ticket = new Ticket
            {
                Description = ticketDto.Description,
                Status = ticketDto.Status,
                Date = ticketDto.Date
            };

            var createdTicket = await _ticketService.CreateTicketAsync(ticket);
            return CreatedAtAction(nameof(GetTicket), new { id = createdTicket.Id }, createdTicket);
        }

        [HttpPut("{id}")]
        public async Task<IActionResult> UpdateTicket(int id, [FromBody] UpdateTicketDto ticketDto)
        {
            var ticket = await _ticketService.GetTicketByIdAsync(id);
            if (ticket == null)
            {
                return NotFound();
            }
            
            ticket.Description = ticketDto.Description;
            ticket.Status = ticketDto.Status;
            ticket.Date = ticketDto.Date;

            await _ticketService.UpdateTicketAsync(ticket);
            return NoContent();
        }

        [HttpDelete("{id}")]
        public async Task<IActionResult> DeleteTicket(int id)
        {
            await _ticketService.DeleteTicketAsync(id);
            return NoContent();
        }
    }
}
