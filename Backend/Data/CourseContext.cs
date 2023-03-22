using Microsoft.EntityFrameworkCore;
using Backend.Models;

namespace Backend.Data;

public class CourseContext : DbContext
{
    public CourseContext(DbContextOptions<CourseContext> options)
        : base(options)
    {}

    public DbSet<Course> Course { get; set; } = default!;

    public DbSet<CourseInstance> CourseInstance { get; set; } = default!;

    protected override void OnModelCreating(ModelBuilder modelBuilder)
    {
        base.OnModelCreating(modelBuilder);

        var course = modelBuilder.Entity<Course>();
        course.HasIndex(c => c.Title).IsUnique();
        course.Property(c => c.Title)
            .IsRequired()
            .HasMaxLength(300);
        course.Property(c => c.Code)
            .IsRequired()
            .HasMaxLength(10);
        course.Property(c => c.Duration)
            .IsRequired();

        course.HasData(
            new Course {
                Id = -1,
                Title = "Programming C#",
                Code = "C#",
                Duration = 5
            },
            new Course {
                Id = -2,
                Title = "Querying SQL Server",
                Code = "QSQL",
                Duration = 5
            }
        );

        var instance = modelBuilder.Entity<CourseInstance>();
        instance.Property(i => i.StartingDate)
            .IsRequired();

        instance.HasData(
            new CourseInstance {
                Id = -1,
                CourseId = -1,
                StartingDate = DateOnly.Parse("8/10/2018")
            },
            new CourseInstance {
                Id = -2,
                CourseId = -2,
                StartingDate = DateOnly.Parse("8/10/2018")
            }
        );
    }
}