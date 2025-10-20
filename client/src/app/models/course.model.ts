export interface Course {
  _id?: string;
  id: string;
  title: string;
  instructor: string;
  duration: string;
  description?: string;
  price?: number;
  category?: string;
  createdAt?: Date;
}

export interface Enrollment {
  _id?: string;
  userId: string;
  courseId: string;
  enrolledAt: Date;
  status?: 'active' | 'completed' | 'dropped';
  progress?: number;
}

export interface EnrolledCourse {
  enrollment: Enrollment;
  course: Course;
}

export interface User {
  _id?: string;
  id?: string;
  username: string;
  email: string;
  firstName: string;
  lastName: string;
  role: 'student' | 'instructor' | 'admin';
  createdAt?: Date;
}

export interface AuthResponse {
  message: string;
  token: string;
  user: User;
}
