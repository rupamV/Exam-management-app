import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Firestore, collection, query, where, getDocs } from '@angular/fire/firestore';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { Router, RouterLink } from '@angular/router';
import { emailRegex, passwordRegex } from '../validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule, CommonModule, RouterLink],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  email: string = '';
  password: string = '';
  role: string = ''; 

  constructor(private fireauth: AuthService, private firestore: Firestore, private router: Router) {}

  ngOnInit(): void {}

  onRoleSelect(role: string) {
    this.role = role;
  }

  async register() {
    if (!this.role) {
      alert('Please select a valid role: examiner or student.');
      return;
    }
  
    if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email');
      return;
    }
    if (this.password === '') {
      alert('Please enter a password');
      return;
    }
    if (!passwordRegex.test(this.password)) {
      alert('Please enter a valid password');
      return;
    }

    if (this.role !== 'examiner' && this.role !== 'student') {
      alert('Please choose a valid role: examiner or student.');
      return;
    }

    if (this.role === 'examiner') {
      const usersCollection = collection(this.firestore, 'users');
      const examinerQuery = query(usersCollection, where('role', '==', 'examiner'));
      const snapshot = await getDocs(examinerQuery);
      if (!snapshot.empty) {
        alert('An examiner already exists. Please register as a student.');
        return;
      }
    }

    try {
      await this.fireauth.register(this.email, this.password, this.role);
      alert('Registration successful!');
      this.router.navigate(['/login']);
    } catch (error: any) {
      alert(`Registration failed: ${error.message}`);
    }

    this.email = '';
    this.password = '';
  }
}
