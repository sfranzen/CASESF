namespace Backend.Models;

public class CourseInstance {
    public int Id { get; set; }

    public DateOnly StartingDate { get; set; }

    public int CourseId { get; set; }

    public Course Course { get; set; }
}