import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth } from '@angular/fire/auth';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.getUser();
    const firebaseToken = localStorage.getItem('token');

    if (!user && !firebaseToken) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];

    if (requiredRole) {
      if (requiredRole === 'student' && user?.role !== 'student') {
        this.router.navigate(['/loginstudent']);
        return false;
      }

      if (requiredRole === 'examiner' && !firebaseToken) {
        this.router.navigate(['/login']);
        return false;
      }
    }

    return true;
  }

  private getUser() {
    return JSON.parse(localStorage.getItem('user') || 'null');
  }
}
