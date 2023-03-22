using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

#pragma warning disable CA1814 // Prefer jagged arrays over multidimensional

namespace Backend.Migrations
{
    /// <inheritdoc />
    public partial class Initial : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Course",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    Title = table.Column<string>(type: "TEXT", maxLength: 300, nullable: false),
                    Code = table.Column<string>(type: "TEXT", maxLength: 10, nullable: false),
                    Duration = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Course", x => x.Id);
                });

            migrationBuilder.CreateTable(
                name: "CourseInstance",
                columns: table => new
                {
                    Id = table.Column<int>(type: "INTEGER", nullable: false)
                        .Annotation("Sqlite:Autoincrement", true),
                    StartingDate = table.Column<DateOnly>(type: "TEXT", nullable: false),
                    CourseId = table.Column<int>(type: "INTEGER", nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_CourseInstance", x => x.Id);
                    table.ForeignKey(
                        name: "FK_CourseInstance_Course_CourseId",
                        column: x => x.CourseId,
                        principalTable: "Course",
                        principalColumn: "Id",
                        onDelete: ReferentialAction.Cascade);
                });

            migrationBuilder.InsertData(
                table: "Course",
                columns: new[] { "Id", "Code", "Duration", "Title" },
                values: new object[,]
                {
                    { -2, "QSQL", 5, "Querying SQL Server" },
                    { -1, "C#", 5, "Programming C#" }
                });

            migrationBuilder.InsertData(
                table: "CourseInstance",
                columns: new[] { "Id", "CourseId", "StartingDate" },
                values: new object[,]
                {
                    { -2, -2, new DateOnly(2018, 10, 8) },
                    { -1, -1, new DateOnly(2018, 10, 8) }
                });

            migrationBuilder.CreateIndex(
                name: "IX_Course_Title",
                table: "Course",
                column: "Title",
                unique: true);

            migrationBuilder.CreateIndex(
                name: "IX_CourseInstance_CourseId",
                table: "CourseInstance",
                column: "CourseId");
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "CourseInstance");

            migrationBuilder.DropTable(
                name: "Course");
        }
    }
}
