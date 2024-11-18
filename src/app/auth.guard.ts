import { Injectable } from '@angular/core';
import { CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, Router } from '@angular/router';
import { UserService } from './services/user.service'; 
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private userService: UserService, private router: Router) {}

  canActivate(
    next: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Observable<boolean> | Promise<boolean> | boolean {
    // Get the current logged-in user
    const currentUser = this.userService.getCurrentUser();

    if (currentUser) {
      // Allow access if the user is logged in
      return true;
    } else {
      // If not logged in, redirect to login page
      this.router.navigate(['/login']);
      return false;
    }
  }
}
