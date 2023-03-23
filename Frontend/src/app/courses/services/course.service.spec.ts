import { TestBed } from '@angular/core/testing';

import { CourseService } from './course.service';
import {HttpClientTestingModule, HttpTestingController} from "@angular/common/http/testing";
import {environment} from "src/environments/environment.development";
import {testInstances} from "../test-data";

describe('CourseService', () => {
  let sut: CourseService;
  let http: HttpTestingController;
  const url = `${environment.API_URL}/instances`;

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
    const expected = testInstances;

    sut.getAll().subscribe(actual => {
      expect(actual).toEqual(expected);
      done();
    });

    http.expectOne(url).flush(expected);
  });

  it('#add should send a POST request', (done: DoneFn) => {
    const expected = testInstances;

    sut.add(expected).subscribe(actual => {
      expect(actual).toEqual(expected);
      done();
    });

    http.expectOne({url, method: "POST"}).flush(expected);
  });
});
