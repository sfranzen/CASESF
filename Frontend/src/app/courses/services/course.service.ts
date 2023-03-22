import { Injectable } from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {CourseInstance} from "../course-instance";
import {environment} from "src/environments/environment";
import {Observable} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class CourseService {
  constructor(private http: HttpClient) { }

  getAll = (): Observable<CourseInstance[]> =>
    this.http.get<CourseInstance[]>(`${environment.API_URL}/instances`);
}
