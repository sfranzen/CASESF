import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {CourseListComponent} from "./course-list/course-list.component";
import {HttpClientModule} from "@angular/common/http";
import {FormsModule, ReactiveFormsModule} from "@angular/forms";
import { FileUploaderComponent } from './file-uploader/file-uploader.component';
import {RouterLink} from "@angular/router";


@NgModule({
  declarations: [
    CourseListComponent,
    FileUploaderComponent
  ],
  imports: [
    CommonModule,
    HttpClientModule,
    FormsModule,
    ReactiveFormsModule,
    RouterLink
  ]
})
export class CoursesModule { }
