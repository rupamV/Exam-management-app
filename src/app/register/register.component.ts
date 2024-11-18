import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
  register(){
    if(this.email ==''){
      alert('Please enter email');
      return;
    }
    if(this.password ==''){
      alert('Please enter password');
      return;
    }
    this.fireauth.register(this.email, this.password);
    this.email = this.password = '';
  }
}
