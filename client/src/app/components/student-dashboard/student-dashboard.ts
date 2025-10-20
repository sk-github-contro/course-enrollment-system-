import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { RouterLink } from '@angular/router';
import { MatSnackBar } from '@angular/material/snack-bar';
import { CommonModule } from '@angular/common';
import { EnrollmentService } from '../../services/enrollment.service';
import { FirebaseAuthService, AuthUser } from '../../services/firebase-auth.service';
import { EnrolledCourse } from '../../models/course.model';

@Component({
  selector: 'app-student-dashboard',
  imports: [CommonModule, RouterLink],
  templateUrl: './student-dashboard.html',
  styleUrl: './student-dashboard.scss'
})
export class StudentDashboard implements OnInit {
  enrolledCourses: EnrolledCourse[] = [];
  loading = false;
  currentUser: AuthUser | null = null;

  constructor(
    private enrollmentService: EnrollmentService,
    private authService: FirebaseAuthService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar
  ) {}

  ngOnInit() {
    // Subscribe to auth state so we react after login/logout
    this.authService.currentUser$.subscribe((user) => {
      this.currentUser = user;
      if (this.currentUser) {
        this.loadEnrolledCourses();
      } else {
        this.enrolledCourses = [];
        this.loading = false;
        this.cdr.detectChanges();
      }
    });
  }

  loadEnrolledCourses() {
    if (!this.currentUser) return;

    this.loading = true;
    this.enrollmentService.getMyCourses(this.currentUser.uid)
      .subscribe({
        next: (courses) => {
          this.enrolledCourses = courses;
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          console.error('Error loading enrolled courses:', error);
          this.loading = false;
          this.cdr.detectChanges();
        }
      });
  }

  continueLearning(course: EnrolledCourse) {
    this.snackBar.open(`Continue learning: ${course.course.title}`, 'Close', { duration: 2000 });
  }

  getEnrollmentDate(enrolledAt: Date): string {
    return new Date(enrolledAt).toLocaleDateString();
  }

  getTotalEnrollments(): number {
    return this.enrolledCourses.length;
  }
}
