import { Component, OnInit } from '@angular/core';
import { AuthService } from '../../services/auth.service';
import { FormsModule } from '@angular/forms';
import { CommonModule } from '@angular/common';
import { RouterLink } from '@angular/router';

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
      if(this.email ==''){
        alert('Please enter email');
        return;
      }
      if(this.password ==''){
        alert('Please enter password');
        return;
      }
      this.fireauth.login(this.email, this.password);
      this.email = this.password = '';
    }
}
