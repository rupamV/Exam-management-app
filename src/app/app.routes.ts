import { Routes } from '@angular/router';
import { AuthGuard } from './auth.guard';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'homepage',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
  },
  {
    path: 'loginstudent',
    loadComponent: () =>
      import('./loginstudent/loginstudent.component').then((m) => m.LoginstudentComponent),
  },
  {
    path: 'register',
    loadComponent: () =>
      import('./register/register.component').then((m) => m.RegisterComponent),
  },
  {
    path: 'verify-email',
    loadComponent: () =>
      import('./verify-email/verify-email.component').then(
        (m) => m.VerifyEmailComponent
      ),
  },
  {
    path: 'homepage',
    loadComponent: () =>
      import('./homepage/homepage.component').then((m) => m.HomepageComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'examiner',
    loadComponent: () =>
      import('./examiner/examiner.component').then((m) => m.ExaminerComponent),
    canActivate: [AuthGuard],
  },
  {
    path: 'student',
    loadComponent: () =>
      import('./student/student.component').then((m) => m.StudentComponent),
    
  },
  {
    path: '**',
    redirectTo: 'homepage',
  },
];
