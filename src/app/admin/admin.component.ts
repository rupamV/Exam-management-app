import { Component } from '@angular/core';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';


@Component({
  standalone  : true,
  imports: [CommonModule,FormsModule],
  selector: 'app-admin',
  templateUrl: './admin.component.html',
  styleUrls: ['./admin.component.css'],
})
export class AdminComponent {
  users: any[] = [];
  selectedUser: any = null;

  constructor(private userService: UserService) {
    this.users = this.userService.getUsers();
  }

  editUser(user: any) {
    this.selectedUser = { ...user };
  }

  updateUser() {
    this.userService.updateUser(this.selectedUser);
    this.selectedUser = null;
  }

  deleteUser(user: any) {
    this.userService.deleteUser(user);
  }
}
