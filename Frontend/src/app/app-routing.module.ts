import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {CourseListComponent} from "./courses/course-list/course-list.component";
import {FileUploaderComponent} from "./courses/file-uploader/file-uploader.component";

const routes: Routes = [
  { path: "courses", component: CourseListComponent },
  { path: "courses/add", component: FileUploaderComponent }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
