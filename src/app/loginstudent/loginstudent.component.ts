import { Component } from '@angular/core';
import { UserService } from '../services/user.service'; 
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  selector: 'app-loginstudent',
  standalone: true,
  imports: [CommonModule, FormsModule],
  templateUrl: './loginstudent.component.html',
  styleUrls: ['./loginstudent.component.css'],
})
export class LoginstudentComponent {
  email = '';
  password = '';

  constructor(
    private userService: UserService,
    private router: Router,
    
  ) {}

  loginstudent() {
    this.userService
      .authenticateUser(this.email, this.password)
      .then((user) => {
        if (user && user.role === 'student') {
          localStorage.setItem('user', JSON.stringify(user));

          this.router.navigate(['/student']);
        } else {
          alert('Invalid credentials or not a student.');
        }
      })
      .catch((err) => {
        alert('Error during login: ' + err);
      });
  }

  
}
