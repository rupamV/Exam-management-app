import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { emailRegex, passwordRegex } from '../../validation';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  email: string = '';
  password: string = '';

  constructor(private fireauth: AuthService, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {}

  async login() {
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email');
      return;
    }
    if (!passwordRegex.test(this.password)) {
      alert('Please enter a valid password');
      return;
    }
  
    try {
      const loggedInUser = await this.fireauth.login(this.email, this.password);
  
      // Ensure `loggedInUser` is typed as `User` and handle logic properly
      if (loggedInUser?.uid) {
        const usersCollection = collection(this.firestore, 'users');
        const userQuery = query(usersCollection, where('uid', '==', loggedInUser.uid));
        const snapshot = await getDocs(userQuery);
  
        if (!snapshot.empty) {
          const userData: any = snapshot.docs[0].data();
          if (userData['role'] === 'examiner') {
            this.router.navigate(['/examiner']);
          } else if (userData['role'] === 'student') {
            this.router.navigate(['/student']);
          } else {
            alert('Unknown role. Please contact support.');
          }
        } else {
          alert('User not found in Firestore');
        }
      } else {
        alert('Login failed: Unable to fetch user details');
      }
    } catch (error: unknown) {
      alert(`Login failed: ${(error as Error).message}`);
    }
  }
  
}
