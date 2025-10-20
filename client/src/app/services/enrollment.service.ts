import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrolledCourse, Enrollment } from '../models/course.model';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = 'http://localhost:5001/api';

  constructor(private http: HttpClient) { }

  enrollInCourse(userId: string, courseId: string): Observable<any> {
    return this.http.post(`${this.apiUrl}/enroll`, { userId, courseId });
  }

  getMyCourses(userId: string): Observable<EnrolledCourse[]> {
    return this.http.get<EnrolledCourse[]>(`${this.apiUrl}/enroll/my-courses?userId=${userId}`);
  }

  checkEnrollment(userId: string, courseId: string): Observable<{isEnrolled: boolean}> {
    return this.http.get<{isEnrolled: boolean}>(`${this.apiUrl}/enroll/check/${userId}/${courseId}`);
  }
}
