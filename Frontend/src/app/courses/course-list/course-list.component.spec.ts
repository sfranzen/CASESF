import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import {CourseService} from "../services/course.service";
import {createCourseInstance} from "../course-instance";
import {createCourse} from "../course";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {MockProvider} from "ng-mocks";

const testCourses = [
  createCourse({title: 'TestCourse1', duration: 5}),
  createCourse({title: 'TestCourse2', duration: 5})
];

const testInstances = [
  createCourseInstance({course: testCourses[0], startingDate: new Date('2018-10-8')}),
  createCourseInstance({course: testCourses[1], startingDate: new Date('2018-10-15')})
];

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let element: HTMLElement;
  let courseServiceMock: jasmine.SpyObj<CourseService>;

  beforeEach(async () => {
    await TestBed.configureTestingModule({
      declarations: [ CourseListComponent ],
      imports: [ FormsModule ],
      providers: [
        MockProvider(CourseService, {
          getAll: () => new Observable(sub => sub.next(testInstances))
        })
      ]
    })
    .compileComponents();

    courseServiceMock = TestBed.inject(CourseService) as jasmine.SpyObj<CourseService>;
    fixture = TestBed.createComponent(CourseListComponent);
    component = fixture.componentInstance;
    element = fixture.nativeElement;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should only display course instances matching the selected week', () => {
    const week: HTMLInputElement = element.querySelector('input#week')!;
    const year: HTMLInputElement = element.querySelector('input#year')!;

    week.value = "41";
    week.dispatchEvent(new Event('input'));
    year.value = "2018";
    year.dispatchEvent(new Event('input'));
    fixture.detectChanges();

    const rows = element.querySelectorAll('tbody tr');
    expect(rows.length).toEqual(1);
    const nameCell = rows[0].querySelectorAll('td')[2];
    expect(nameCell.textContent).toEqual('TestCourse1');
  });

  it('should show starting date, duration and title of a course instance', () => {
    const cells = element.querySelectorAll('tbody tr td')!;
    const expected = testInstances[0];

    expect(cells[0].textContent).toEqual(expected.startingDate.toString());
    expect(cells[1].textContent).toContain(expected.course.duration);
    expect(cells[2].textContent).toEqual(expected.course.title);
  });
});
