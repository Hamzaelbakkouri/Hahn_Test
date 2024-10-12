using Microsoft.EntityFrameworkCore;
using Xunit;
using System.Threading.Tasks;
using TicketManagement.API.Models;
using TicketManagement.API.Services;
using TicketManagement.API.Data;
using System.Collections.Generic;

namespace TicketManagement.API.Tests;

public class TicketServiceTests
{
    private TicketServiceImplementation CreateTicketService(out ApplicationDbContext context)
    {
        var options = new DbContextOptionsBuilder<ApplicationDbContext>()
            .UseInMemoryDatabase(databaseName: System.Guid.NewGuid().ToString())
            .Options;

        context = new ApplicationDbContext(options);
        return new TicketServiceImplementation(context);
    }

    [Fact]
    public async Task GetTicketsAsync_ReturnsPaginatedResult()
    {
        
        var service = CreateTicketService(out var context);
        context.Tickets.AddRange(new List<Ticket>
        {
            new Ticket { Id = 1, Description = "Issue 1", Status = "Open", Date = System.DateTime.Now },
            new Ticket { Id = 2, Description = "Issue 2", Status = "Closed", Date = System.DateTime.Now.AddDays(-1) }
        });
        await context.SaveChangesAsync();

        
        var result = await service.GetTicketsAsync(1, 10, "id", "asc", "");

        
        Assert.NotNull(result);
        Assert.Equal(2, result.Items.Count);
        Assert.Equal(2, result.TotalCount);
    }

    [Fact]
    public async Task GetTicketByIdAsync_ShouldReturnTicket_WhenTicketExists()
    {
        
        var service = CreateTicketService(out var context);
        var ticket = new Ticket { Id = 1, Description = "Issue 1", Status = "Open", Date = System.DateTime.Now };
        context.Tickets.Add(ticket);
        await context.SaveChangesAsync();

        
        var result = await service.GetTicketByIdAsync(1);

        
        Assert.NotNull(result);
        Assert.Equal(1, result.Id);
        Assert.Equal("Issue 1", result.Description);
    }

    [Fact]
    public async Task CreateTicketAsync_ShouldAddTicketToDatabase()
    {
        
        var service = CreateTicketService(out var context);
        var newTicket = new Ticket { Id = 3, Description = "New Issue", Status = "Open", Date = System.DateTime.Now };

        
        var result = await service.CreateTicketAsync(newTicket);

        
        var ticketInDb = await context.Tickets.FindAsync(3);
        Assert.NotNull(ticketInDb);
        Assert.Equal("New Issue", ticketInDb.Description);
    }

    [Fact]
    public async Task UpdateTicketAsync_ShouldReturnNull_WhenTicketDoesNotExist()
    {
        
        var service = CreateTicketService(out var context);
        var updatedTicket = new Ticket { Id = 99, Description = "Updated Issue", Status = "Closed", Date = System.DateTime.Now };

        
        var result = await service.UpdateTicketAsync(updatedTicket);

        
        Assert.Null(result);
    }

    [Fact]
    public async Task DeleteTicketAsync_ShouldReturnTrue_WhenTicketIsDeleted()
    {
        
        var service = CreateTicketService(out var context);
        var ticket = new Ticket { Id = 1, Description = "Issue to delete", Status = "Closed", Date = System.DateTime.Now };
        context.Tickets.Add(ticket);
        await context.SaveChangesAsync();

        
        var result = await service.DeleteTicketAsync(1);

        
        Assert.True(result);
        var deletedTicket = await context.Tickets.FindAsync(1);
        Assert.Null(deletedTicket);
    }

    [Fact]
    public async Task DeleteTicketAsync_ShouldReturnFalse_WhenTicketDoesNotExist()
    {
        
        var service = CreateTicketService(out var context);

        
        var result = await service.DeleteTicketAsync(99);

        
        Assert.False(result);
    }
}
