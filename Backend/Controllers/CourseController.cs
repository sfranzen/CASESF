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

    // [HttpPost("instances")]
    // public async Task<ActionResult<CourseInstance>> PostCourse(CourseInstance instance)
    // {
    //     var course = await _context.Course.SingleOrDefaultAsync(c => c.Title == instance.Course.Title);
    //     if (course is not null)
    //         instance.Course = course;
    //
    //     _context.CourseInstance.Add(instance);
    //     await _context.SaveChangesAsync();
    //
    //     return CreatedAtAction("GetInstance", new { id = instance.Id }, instance);
    // }

    [HttpPost("instances")]
    public async Task<ActionResult<IEnumerable<CourseInstance>>> PostCourse([FromBody] List<CourseInstance> instances)
    {
        foreach (var instance in instances) {
            var course = await _context.Course.SingleOrDefaultAsync(c => c.Title == instance.Course.Title);

            if (course is not null) {
                instance.Course = null!;
                instance.CourseId = course.Id;
            }

            // Dit is niet ideaal, maar werkt voor nu om dubbele cursussen te voorkomen
            _context.CourseInstance.Add(instance);
            await _context.SaveChangesAsync();
        }

        return instances;
    }
}