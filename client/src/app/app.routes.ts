import { Routes } from '@angular/router';
import { CourseCatalog } from './components/course-catalog/course-catalog';
import { StudentDashboard } from './components/student-dashboard/student-dashboard';
import { Login } from './components/login/login';

export const routes: Routes = [
  { path: '', redirectTo: '/catalog', pathMatch: 'full' },
  { path: 'catalog', component: CourseCatalog },
  { path: 'dashboard', component: StudentDashboard },
  { path: 'login', component: Login }
];
