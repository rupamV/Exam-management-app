import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router) {}

  canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): boolean {
    const user = this.getUser(); 

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const requiredRole = route.data['role'];
    if (requiredRole && user.role !== requiredRole) {
      if (user.role === 'student') {
        this.router.navigate(['/student']);
      } else if (user.role === 'examiner') {
        this.router.navigate(['/homepage']);
      }
      return false;
    }

    return true;
  }

  private getUser() {
    const user = JSON.parse(localStorage.getItem('user') || 'null');
    return user;
  }
}
