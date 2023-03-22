import {Component, OnInit} from '@angular/core';
import {CourseInstance} from "../course-instance";
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-course-list',
  templateUrl: './course-list.component.html',
  styleUrls: ['./course-list.component.css']
})
export class CourseListComponent implements OnInit {
  filteredInstances: CourseInstance[] = [];
  allInstances: CourseInstance[] = [];
  week: number = 41;
  year: number = 2018;

  constructor(private courseService: CourseService) { }

  ngOnInit()
  {
    this.courseService.getAll()
      .subscribe(instances => {
        this.allInstances = instances;
        this.update();
      });
  }

  prevWeek()
  {
    --this.week;
    if (this.week == 0) {
      this.week = 52;
      --this.year;
    }
    this.update();
  }

  nextWeek()
  {
    this.week = 1 + this.week % 52;
    if (this.week == 1)
      ++this.year;
    this.update();
  }

  update()
  {
    let monday = this.firstDayOfWeek().getTime();
    this.filteredInstances = this.allInstances.filter(c => {
      const start = new Date(c.startingDate);
      const diff = new Date(start.getTime() - monday);
      return diff.getDate() < 7;
    });
  }

  private firstDayOfWeek(): Date
  {
    let date = new Date(this.year, 0, 1);
    const firstMondayOfYear = (8 - date.getDay()) % 7;
    date.setDate(date.getDate() + firstMondayOfYear + 7 * (this.week - 1));
    return date;
  }
}
