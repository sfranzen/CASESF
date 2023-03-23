using System.Text.Json;
using System.Text.Json.Serialization;

namespace Backend.Models;

internal class DateConverter : JsonConverter<DateOnly> {
    public override DateOnly Read(ref Utf8JsonReader reader, Type typeToConvert, JsonSerializerOptions options)
    {
        var date = DateTime.Parse(reader.GetString()!);
        return DateOnly.FromDateTime(date);
    }

    public override void Write(Utf8JsonWriter writer, DateOnly value, JsonSerializerOptions options)
    {
        writer.WriteStringValue(value.ToString());
    }
}

public class CourseInstance {
    public int Id { get; set; }

    [JsonConverter(typeof(DateConverter))]
    public DateOnly StartingDate { get; set; }

    public int CourseId { get; set; }

    public Course Course { get; set; }
}