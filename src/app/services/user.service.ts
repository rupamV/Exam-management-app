import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    { name: 'John Admin', email: 'admin@example.com', role: 'Admin' },
    { name: 'Emma Examiner', email: 'emma@example.com', role: 'Examiner' },
    { name: 'David Examiner', email: 'david@example.com', role: 'Examiner' },
    { name: 'Alice Student', email: 'alice@example.com', role: 'Student' },
    { name: 'Bob Student', email: 'bob@example.com', role: 'Student' },
  ];

  getUsers() {
    return this.users;
  }

  updateUser(updatedUser: any) {
    const index = this.users.findIndex((u) => u.email === updatedUser.email);
    if (index !== -1) {
      this.users[index] = updatedUser;
    }
  }

  deleteUser(user: any) {
    this.users = this.users.filter((u) => u.email !== user.email);
  }
}
