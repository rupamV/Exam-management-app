import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';
import { emailRegex,passwordRegex } from '../../validation';
@Component({
  selector: 'app-login',
  standalone: true,
  imports: [FormsModule,CommonModule,RouterLink],
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'
})
export class LoginComponent implements OnInit {
   
    email: string = '';
    password: string = '';

    constructor(private fireauth: AuthService) { }

    ngOnInit(): void {
    }
    
    login(){
      if (!emailRegex.test(this.email)) {
      alert('Please enter a valid email');
      return;
      }
      if (!passwordRegex.test(this.password)) {
      alert('Please enter a valid password');
      return;
      }
      this.fireauth.login(this.email, this.password);
      this.email = this.password = '';
    }
}
