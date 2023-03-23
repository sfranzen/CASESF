import {Component} from '@angular/core';
import {CourseInstance} from "../course-instance";
import {FormControl, FormGroup, Validators} from "@angular/forms";
import {createCourse} from "../course";
import {CourseService} from "../services/course.service";

@Component({
  selector: 'app-file-uploader',
  templateUrl: './file-uploader.component.html',
  styleUrls: ['./file-uploader.component.css']
})
export class FileUploaderComponent {
  file: File | undefined;
  reader = new FileReader();
  form = new FormGroup({
    start: new FormControl<Date|null>(null),
    end: new FormControl<Date|null>(null),
    file: new FormControl<File|null>(null, Validators.required)
  });
  processing = false;
  message: string | undefined;

  constructor(private courseService: CourseService)
  {
    this.reader.onloadend = () => {
      console.log("finished reading!");
      const instances = FileUploaderComponent.parse(this.reader.result as string);
      this.courseService
        .add(instances)
        .subscribe(added =>
          this.message = `Er zijn ${added.length} cursussen geïmporteerd.`
        );
    };
  }

  onFileChanged(event: Event)
  {
    const fileInput = event.target as HTMLInputElement;
    if (fileInput.files)
      this.file = fileInput.files[0];
  }

  onSubmit()
  {
    this.message = undefined;
    if (this.file) {
      console.log("reading file", this.file)
      this.reader.readAsText(this.file);
    }
  }

  private static parse(input: string): CourseInstance[]
  {
    return input
      .split('\n\n')
      .filter(line => line.length > 0)
      .map(block => this.parseInstance(block));
  }

  private static parseInstance(input: string): CourseInstance
  {
    let course = createCourse();
    let date: Date | undefined;

    for (const line of input.split('\n')) {
      if (line.startsWith('Titel: '))
        course.title = line.substring(7);
      else if (line.startsWith('Cursuscode: '))
        course.code = line.substring(12);
      else if (line.startsWith('Duur: '))
        course.duration = Number.parseInt(line.substring(6));
      else if (line.startsWith('Startdatum: '))
        date = this.parseDate(line.substring(12));
    }

    return { course, startingDate: date! };
  }

  private static parseDate(input: string): Date
  {
    let [day, month, year] = input
      .split('/', 3)
      .map(sub => Number.parseInt(sub));
    return new Date(year, month - 1, day);
  }
}
