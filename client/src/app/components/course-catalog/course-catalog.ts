import { Component, OnInit } from '@angular/core';
import { ChangeDetectorRef } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';
import { MatDialog } from '@angular/material/dialog';
import { ConfirmDialogComponent } from '../shared/confirm-dialog/confirm-dialog';
import { CommonModule } from '@angular/common';
import { CourseService } from '../../services/course.service';
import { EnrollmentService } from '../../services/enrollment.service';
import { FirebaseAuthService } from '../../services/firebase-auth.service';
import { Course } from '../../models/course.model';

@Component({
  selector: 'app-course-catalog',
  imports: [CommonModule],
  templateUrl: './course-catalog.html',
  styleUrl: './course-catalog.scss'
})
export class CourseCatalog implements OnInit {
  courses: Course[] = [];
  loading = false;
  enrolledCourses: Set<string> = new Set();

  constructor(
    private courseService: CourseService,
    private enrollmentService: EnrollmentService,
    private authService: FirebaseAuthService,
    private cdr: ChangeDetectorRef,
    private snackBar: MatSnackBar,
    private dialog: MatDialog
  ) {}

  ngOnInit() {
    // Load courses and also react to auth changes so enrollment badges update
    this.loadCourses();
    this.authService.currentUser$.subscribe(() => {
      // Re-check enrollments when auth user changes
      if (this.courses.length > 0) {
        this.enrolledCourses.clear();
        this.checkEnrollments();
        this.cdr.detectChanges();
      }
    });
  }

  loadCourses() {
    this.loading = true;
    this.courses = []; // Clear previous courses
    
    // Add retry mechanism for mobile
    let retryCount = 0;
    const maxRetries = 2; // Reduced retries for faster fallback
    
    const attemptLoad = () => {
      this.courseService.getCourses().subscribe({
        next: (courses) => {
          this.courses = courses;
          this.checkEnrollments();
          this.loading = false;
          this.cdr.detectChanges();
        },
        error: (error) => {
          retryCount++;
          if (retryCount < maxRetries) {
            // Retry after 500ms
            setTimeout(() => {
              attemptLoad();
            }, 500);
          } else {
            // Final attempt failed, use fallback data
            this.loadFallbackCourses();
          }
        }
      });
    };
    
    attemptLoad();
  }

  loadFallbackCourses() {
    // Fallback courses if API fails
    this.courses = [
      {
        id: 'course01',
        title: 'Introduction to Artificial Intelligence',
        instructor: 'Dr. Smith',
        duration: '6 weeks',
        description: 'Learn the fundamentals of AI, machine learning, and neural networks.',
        price: 299,
        category: 'Technology'
      },
      {
        id: 'course02',
        title: 'Web Development with Angular',
        instructor: 'Sarah Johnson',
        duration: '8 weeks',
        description: 'Master modern web development using Angular, Node.js, and MongoDB.',
        price: 399,
        category: 'Web Development'
      },
      {
        id: 'course03',
        title: 'Data Science Fundamentals',
        instructor: 'Prof. Chen',
        duration: '10 weeks',
        description: 'Comprehensive introduction to data analysis, visualization, and machine learning.',
        price: 499,
        category: 'Data Science'
      }
    ];
    this.checkEnrollments();
    this.loading = false;
    this.cdr.detectChanges();
  }

  checkEnrollments() {
    const currentUser = this.authService.getCurrentUser();
    if (currentUser) {
      this.courses.forEach(course => {
        this.enrollmentService.checkEnrollment(currentUser.uid, course.id)
          .subscribe({
            next: (response) => {
              if (response.isEnrolled) {
                this.enrolledCourses.add(course.id);
              }
            }
          });
      });
    }
  }

  enrollInCourse(course: Course) {
    const currentUser = this.authService.getCurrentUser();
    if (!currentUser) {
      alert('Please login to enroll in courses');
      return;
    }

    if (this.enrolledCourses.has(course.id)) {
      alert('You are already enrolled in this course');
      return;
    }

    this.dialog.open(ConfirmDialogComponent, {
      data: {
        title: 'Enroll in course',
        message: `Are you sure you want to enroll in "${course.title}"?`,
        confirmText: 'Enroll',
        cancelText: 'Cancel'
      }
    }).afterClosed().subscribe((confirmed: boolean) => {
      if (!confirmed) return;
      this.enrollmentService.enrollInCourse(
        currentUser.uid,
        course.id
      ).subscribe({
        next: () => {
          this.enrolledCourses.add(course.id);
          this.snackBar.open('Successfully enrolled in the course!', 'Close', { duration: 2500 });
        },
        error: (error) => {
          console.error('Error enrolling in course:', error);
          this.snackBar.open('Error enrolling in course. Please try again.', 'Close', { duration: 3000 });
        }
      });
    });
  }

  isEnrolled(courseId: string): boolean {
    return this.enrolledCourses.has(courseId);
  }
}
