import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    { name: 'Emma Examiner', email: 'emma@example.com', role: 'Examiner' },
    { name: 'David Examiner', email: 'david@example.com', role: 'Examiner' },
    { name: 'Alice Student', email: 'alice@example.com', role: 'Student' },
    { name: 'Bob Student', email: 'bob@example.com', role: 'Student' },
  ];

  getUsers() {
    return this.users;
  }

  getUserByEmail(email: string) {
    return this.users.find((user) => user.email === email);
  }
}
