import { Injectable } from '@angular/core';
import { Auth, signInWithEmailAndPassword, createUserWithEmailAndPassword, sendEmailVerification, sendPasswordResetEmail, signOut, User } from '@angular/fire/auth';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root',
})
export class AuthService {
  constructor(private auth: Auth, private router: Router) {}

  login(email: string, password: string) {
    signInWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        localStorage.setItem('token', 'true');
        localStorage.setItem('role', 'examiner');
  
        if (res.user?.emailVerified) {
          this.router.navigate(['examiner']);
        } else {
          this.router.navigate(['/verify-email']);
        }
      })
      .catch((err) => {
        alert(err.message);
        this.router.navigate(['/login']);
      });
  }
  
  register(email: string, password: string) {
    createUserWithEmailAndPassword(this.auth, email, password)
      .then((res) => {
        alert('Registration Successful');
        this.sendEmailForVerification(res.user);
        this.router.navigate(['/login']);
      })
      .catch((err) => {
        alert(err.message);
        this.router.navigate(['/register']);
      });
  }

  logout() {
    signOut(this.auth)
      .then(() => {
        localStorage.removeItem('token');
        localStorage.removeItem('role');
        localStorage.removeItem('user');
        this.router.navigate(['/homepage']);
      })
      .catch((err) => {
        alert(err.message);
      });
  }

  sendEmailForVerification(user: User | null) {
    if (user) {
      sendEmailVerification(user)
        .then(() => {
          this.router.navigate(['/verify-email']);
        })
        .catch(() => {
          alert('Something went wrong. Unable to send the email.');
        });
    }
  }
}
