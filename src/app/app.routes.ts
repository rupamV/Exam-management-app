import { Routes } from '@angular/router';
import { AuthGuard } from './auth/auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () => import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'register',
    loadComponent: () => import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./verify-email/verify-email.component').then((m) => m.VerifyEmailComponent),
  },
  {
    path: 'homepage',
    loadComponent: () => import('./homepage/homepage.component').then((m) => m.HomepageComponent),
  },
  {
    path: 'student',
    loadComponent: () => import('./student/student.component').then((m) => m.StudentComponent),
    canActivate: [AuthGuard],
    data: { role: 'student' },
  },
  {
    path: 'examiner',
    loadComponent: () => import('./examiner/examiner.component').then((m) => m.ExaminerComponent),
    canActivate: [AuthGuard],
    data: { role: 'examiner' },
  },
  {
    path: '**',
    redirectTo: 'homepage',
  },
];
