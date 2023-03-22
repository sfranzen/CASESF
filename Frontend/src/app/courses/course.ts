export interface Course {
  title: string;
  duration: number;
}

export function createCourse(args?: Partial<Course>): Course {
  return {
    title: '',
    duration: 0,
    ...args
  }
}


