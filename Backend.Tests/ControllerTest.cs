using Backend.Controllers;
using Backend.Data;
using Backend.Models;
using Microsoft.EntityFrameworkCore;

namespace Backend.Tests;

public class TestDbFixture {
    private const string ConnectionString = @"Data Source=kenniscentrum-test.db";

    public TestDbFixture()
    {
        using var context = CreateContext();
        context.Database.EnsureDeleted();
        context.Database.EnsureCreated();
    }

    public CourseContext CreateContext() => new(
        new DbContextOptionsBuilder<CourseContext>()
            .UseSqlite(ConnectionString)
            .Options
    );
}

public class ControllerTest : IClassFixture<TestDbFixture> {
    private readonly CourseContext _context;
    private readonly CourseController _sut;
    private TestDbFixture Fixture { get; }

    public ControllerTest(TestDbFixture fixture)
    {
        Fixture = fixture;
        _context = Fixture.CreateContext();
        _sut = new CourseController(_context);
    }

    [Fact]
    public void GetInstance_Should_Return_All_Instances()
    {
        var result = _sut.GetInstance().Result;
        Assert.Equal(2, result.Count());
    }

    [Fact]
    public void GetInstance_With_Argument_Should_Return_Instance_or_404()
    {
        var found = _sut.GetInstance(-1).Result;
        var notFound = _sut.GetInstance(0).Result;

        Assert.NotNull(found.Value);
        Assert.Null(notFound.Value);
    }

    [Fact]
    public async Task PostInstance_Should_Add_Instances()
    {
        var date = DateOnly.Parse("1/1/1");
        var course = await _context.Course.FindAsync(-1);
        var expected = new CourseInstance[] {
            new() {
                Course = course!,
                StartingDate = date
            },
            new() {
                Course = course!,
                StartingDate = date
            }
        };

        await _sut.PostInstance(expected);
        _context.ChangeTracker.Clear();

        var actual = _context.CourseInstance
            .Where(i => i.StartingDate == date);

        Assert.Equal(2, actual.Count());
    }
}