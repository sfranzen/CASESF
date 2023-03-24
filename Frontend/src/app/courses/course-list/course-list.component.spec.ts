import {ComponentFixture, TestBed} from '@angular/core/testing';
import { CourseListComponent } from './course-list.component';
import {CourseService} from "../services/course.service";
import {Observable} from "rxjs";
import {FormsModule} from "@angular/forms";
import {MockProvider} from "ng-mocks";
import {testInstances} from "../test-data";

describe('CourseListComponent', () => {
  let component: CourseListComponent;
  let fixture: ComponentFixture<CourseListComponent>;
  let element: HTMLElement;
  let courseServiceMock: jasmine.SpyObj<CourseService>;
  let buttons: NodeListOf<HTMLButtonElement>;
  let weekInput: HTMLInputElement;
  let yearInput: HTMLInputElement;

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
    buttons = element.querySelectorAll('button');
    weekInput = element.querySelector('input#week')!;
    yearInput = element.querySelector('input#year')!;
    fixture.detectChanges();
  });

  it('should create', () => {
    expect(component).toBeTruthy();
  });

  it('should have week navigation elements', () => {
    expect(buttons.length).toEqual(2);
    expect(buttons[0].textContent).toEqual("Vorige Week");
    expect(buttons[1].textContent).toEqual("Volgende Week");
    expect(weekInput).toBeDefined();
    expect(yearInput).toBeDefined();
  });

  it('should update the date when the buttons are clicked', () => {
    inputDate(1, 2018);

    buttons[0].click();
    expect(component.week).toEqual(52);
    expect(component.year).toEqual(2017);

    buttons[1].click();
    expect(component.week).toEqual(1);
    expect(component.year).toEqual(2018);
  });

  it('should show starting date, duration and title of a course instance', () => {
    const cells = element.querySelectorAll('tbody tr td')!;
    const expected = testInstances[2];

    expect(cells[0].textContent).toEqual(expected.startingDate.toLocaleDateString());
    expect(cells[1].textContent).toContain(expected.course.duration);
    expect(cells[2].textContent).toEqual(expected.course.title);
  });

  it('should filter shown instances by date', () => {
    inputDate(41, 2018);

    const rows = element.querySelectorAll('tbody tr');
    expect(rows.length).toEqual(3);
    const nameCell = rows[0].querySelectorAll('td')[2];
    expect(nameCell.textContent).toEqual('TestCourse1');
  });

  it('should sort shown instances by date, ascending', () => {
    inputDate(41, 2018);

    for (let i: number = 1; i < component.filteredInstances.length; ++i) {
      const [a, b] = component.filteredInstances.slice(i - 1, i + 1);
      expect(a.startingDate.getTime()).toBeLessThan(b.startingDate.getTime());
    }
  });

  it('first day of week is always monday', () => {
    const expected = [
      [1, 2020], [52, 2019], [42, 2018]
    ];

    expected.forEach(([week, year]) => {
      component.week = week;
      component.year = year;
      const date = component.firstDayOfWeek();
      expect(date.getDay()).toEqual(1);
      expect(date.getFullYear()).toEqual(year);
    });
  });

  function inputDate(week: number, year: number)
  {
    weekInput.value = week.toString();
    yearInput.value = year.toString();
    [weekInput, yearInput].forEach(el => el.dispatchEvent(new Event('input')));
    fixture.detectChanges();
  }
});
