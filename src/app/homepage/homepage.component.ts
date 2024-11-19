import { Component, Inject } from '@angular/core';
import { Router } from '@angular/router';
import { UserService } from '../services/user.service';

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [],
  templateUrl: './homepage.component.html',
  styleUrl: './homepage.component.css'
})
export class HomepageComponent {
  errorMessage: string = '';

  constructor( private router: Router, private userService: UserService) { }
 
    email = '';
    password = '';
    login(){
        this.router.navigate(['login']);
    }
    loginStudent() {
      this.router.navigate(['login']);
    }
}
