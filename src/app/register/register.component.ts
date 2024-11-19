import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { emailRegex,passwordRegex } from '../validation';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './register.component.html',
  styleUrl: './register.component.css'
})
export class RegisterComponent implements OnInit{
  email: string = '';
  password: string = '';

  constructor(private fireauth: AuthService) { }

  ngOnInit(): void {
  }
  register() {
   
    if (this.password == '') {
      alert('Please enter password');
      return;
    }
    if (!passwordRegex.test(this.password)) {
      alert('Please enter a valid password');
      return;
    }
    this.fireauth.register(this.email, this.password);
    this.email = this.password = '';
  }
}
