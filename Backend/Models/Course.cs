namespace Backend.Models;

public class Course {
    public int Id { get; set; }

    public string Title { get; set; } = default!;

    public string Code { get; set; } = default!;

    public int Duration { get; set; }
}