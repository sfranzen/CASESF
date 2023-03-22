import {Course, createCourse} from "./course";

export interface CourseInstance {
  course: Course;
  startingDate: Date;
}

export function createCourseInstance(args?: Partial<CourseInstance>): CourseInstance
{
  return {
    course: createCourse(),
    startingDate: new Date(),
    ...args
  }
}
