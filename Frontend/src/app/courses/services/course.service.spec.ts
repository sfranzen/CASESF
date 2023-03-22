import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {createCourse} from "../course";
import {createCourseInstance} from "../course-instance";
import {environment} from "../../../environments/environment.development";

describe('CourseService', () => {
  let sut: CourseService;
  let http: HttpTestingController;
  const testCourses = [
    createCourse({title: 'Test', duration: 5})
  ];
  const testInstances = [
    createCourseInstance({course: testCourses[0], startingDate: new Date('8-10-2018')})
  ];

  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [CourseService],
      imports: [HttpClientTestingModule]
    });
    http = TestBed.inject(HttpTestingController);
    sut = TestBed.inject(CourseService);
  });

  it('should be created', () => {
    expect(sut).toBeTruthy();
  });

  it('#getAll should return all courses', (done: DoneFn) => {
    sut.getAll().subscribe(courses => {
      expect(courses).toEqual(testInstances);
      done();
    });

    http
      .expectOne(`${environment.API_URL}/instances`)
      .flush(testInstances);
  });
});
