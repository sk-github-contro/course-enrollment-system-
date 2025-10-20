import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { EnrolledCourse, Enrollment } from '../models/course.model';
import { environment } from '../../environments/environment';
import { FirebaseAuthService } from './firebase-auth.service';

@Injectable({
  providedIn: 'root'
})
export class EnrollmentService {
  private apiUrl = environment.apiBaseUrl;

  constructor(private http: HttpClient, private auth: FirebaseAuthService) { }

  private async authHeaders(): Promise<HttpHeaders> {
    const token = await this.auth.getToken();
    return new HttpHeaders({
      'Authorization': token ? `Bearer ${token}` : ''
    });
  }

  enrollInCourse(userId: string, courseId: string): Observable<any> {
    return new Observable((subscriber) => {
      this.authHeaders().then(headers => {
        this.http.post(`${this.apiUrl}/enroll`, { userId, courseId }, { headers })
          .subscribe(subscriber);
      }).catch(err => subscriber.error(err));
    });
  }

  getMyCourses(userId: string): Observable<EnrolledCourse[]> {
    return new Observable((subscriber) => {
      this.authHeaders().then(headers => {
        this.http.get<EnrolledCourse[]>(`${this.apiUrl}/enroll/my-courses?userId=${userId}`, { headers })
          .subscribe(subscriber);
      }).catch(err => subscriber.error(err));
    });
  }

  checkEnrollment(userId: string, courseId: string): Observable<{isEnrolled: boolean}> {
    return new Observable((subscriber) => {
      this.authHeaders().then(headers => {
        this.http.get<{isEnrolled: boolean}>(`${this.apiUrl}/enroll/check/${userId}/${courseId}`, { headers })
          .subscribe(subscriber);
      }).catch(err => subscriber.error(err));
    });
  }
}
