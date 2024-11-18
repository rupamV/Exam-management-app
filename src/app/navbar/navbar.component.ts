import { Component, OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-navbar',
  standalone: true,
  imports: [],
  templateUrl: './navbar.component.html',
  styleUrl: './navbar.component.css'
})
export class NavbarComponent implements OnInit {

  constructor(private authService: AuthService, private router: Router) { }

  ngOnInit(): void {
    // Optionally, check if the user is logged in and display the navbar accordingly
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);  // Redirect to login page after logging out
  }
}