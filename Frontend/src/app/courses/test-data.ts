import {createCourse} from "./course";
import {createCourseInstance} from "./course-instance";

export const testCourses = [
  createCourse({
    title: 'TestCourse1',
    duration: 5
  }),
  createCourse({
    title: 'TestCourse2',
    duration: 5
  })
];

export const testInstances = [
  createCourseInstance({
    course: testCourses[0],
    startingDate: new Date('2018-10-10')
  }),
  createCourseInstance({
    course: testCourses[0],
    startingDate: new Date('2018-10-9')
  }),
  createCourseInstance({
    course: testCourses[0],
    startingDate: new Date('2018-10-8')
  }),
  createCourseInstance({
    course: testCourses[1],
    startingDate: new Date('2018-10-15')
  })
];
