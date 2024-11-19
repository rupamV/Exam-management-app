import { Injectable } from '@angular/core';
import {
  Auth,
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  sendEmailVerification,
  User,
  signOut,
  UserCredential,
} from '@angular/fire/auth';
import {
  Firestore,
  collection,
  addDoc,
  getDocs,
  query,
  where,
} from '@angular/fire/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(
    private auth: Auth,
    private firestore: Firestore,
    private router: Router
  ) {}

  async login(email: string, password: string): Promise<User> {
    try {
      const res: UserCredential = await signInWithEmailAndPassword(this.auth, email, password); // Explicitly typed as UserCredential
      return res.user; // Return the User object
    } catch (error: any) {
      throw new Error(`Login failed: ${error.message}`);
    }
  }
  async register(email: string, password: string, role: string): Promise<void> {
    try {
      const res = await createUserWithEmailAndPassword(this.auth, email, password);
      const usersCollection = collection(this.firestore, 'users');

      await addDoc(usersCollection, {
        uid: res.user.uid,
        email,
        role,
      });

      await this.sendEmailForVerification(res.user);
    } catch (error: any) {
      throw new Error(`Registration failed: ${error.message}`);
    }
  }

  sendEmailForVerification(user: User): void {
    sendEmailVerification(user)
      .then(() => {
        alert('Verification email sent!');
        this.router.navigate(['/verify-email']);
      })
      .catch(() => {
        alert('Unable to send verification email.');
      });
  }

  async logout(): Promise<void> {
    try {
      await signOut(this.auth);
      this.router.navigate(['/homepage']);
    } catch (error: any) {
      alert(`Logout failed: ${error.message}`);
    }
  }
}