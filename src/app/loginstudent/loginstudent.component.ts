import { Component, Inject } from '@angular/core';
import { UserService } from '../services/user.service';  // Ensure the path is correct
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

  constructor(private userService: UserService, private router: Router) {}

  loginstudent() {
    // Authenticate the user with email and password
    this.userService.authenticateUser(this.email, this.password).then((user) => {
      if (user && user.role === 'student') {
        // If authentication is successful and the user is a student, navigate to the student dashboard
        this.router.navigate(['/student']);
      } else {
        // If the authentication fails or the role is not student, show an error alert
        alert('Invalid credentials or not a student.');
      }
    }).catch(err => {
      alert('Error during login: ' + err);
    });
  }
}
