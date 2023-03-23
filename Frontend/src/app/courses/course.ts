export interface Course {
  title: string;
  code: string;
  duration: number;
}

export function createCourse(args?: Partial<Course>): Course {
  return {
    title: '',
    code: '',
    duration: 0,
    ...args
  }
}


