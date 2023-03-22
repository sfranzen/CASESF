using Microsoft.AspNetCore.Mvc;
using Microsoft.EntityFrameworkCore;
using Backend.Data;
using Backend.Models;

namespace Backend.Controllers;

[Route("api")]
[ApiController]
public class CourseController : ControllerBase
{
    private readonly CourseContext _context;

    public CourseController(CourseContext context)
    {
        _context = context;
    }

    [HttpGet("instances")]
    public async Task<IEnumerable<CourseInstance>> GetInstance()
    {
        return await _context.CourseInstance.Include(i => i.Course).ToListAsync();
    }

    [HttpGet("instances/{id}")]
    public async Task<ActionResult<CourseInstance>> GetInstance(int id)
    {
        var instance = await _context.CourseInstance.FindAsync(id);

        if (instance == null)
        {
            return NotFound();
        }

        return instance;
    }
}