import { Injectable } from '@angular/core';
import {
  CanActivate,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
  Router,
} from '@angular/router';
import { Auth } from '@angular/fire/auth';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class AuthGuard implements CanActivate {
  constructor(private router: Router, private auth: Auth, private firestore: Firestore) {}

  async canActivate(
    route: ActivatedRouteSnapshot,
    state: RouterStateSnapshot
  ): Promise<boolean> {
    const user = this.auth.currentUser;

    if (!user) {
      this.router.navigate(['/login']);
      return false;
    }

    const usersCollection = collection(this.firestore, 'users');
    const userQuery = query(usersCollection, where('uid', '==', user.uid));
    const snapshot = await getDocs(userQuery);

    if (snapshot.empty) {
      this.router.navigate(['/login']);
      return false;
    }

    const userData: any = snapshot.docs[0].data();
    const requiredRole = route.data['role'];

    if (requiredRole && userData.role !== requiredRole) {
      this.router.navigate(['/homepage']);
      return false;
    }

    return true;
  }
}
