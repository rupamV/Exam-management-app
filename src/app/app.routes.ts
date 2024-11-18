import { Routes } from '@angular/router';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'login',
    pathMatch: 'full',
  },
  {
    path: 'login',
    loadComponent: () =>
      import('./auth/login/login.component').then((m) => m.LoginComponent),
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
  },
  // Examiner route
  {
    path: 'examiner',
    loadComponent: () =>
      import('./examiner/examiner.component').then((m) => m.ExaminerComponent),
  },
  // Student route
  {
    path: 'student',
    loadComponent: () =>
      import('./student/student.component').then((m) => m.StudentComponent),
  },
  {
    path: '**',
    redirectTo: 'login', // Redirect any unknown route to login
  },
];
