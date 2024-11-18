import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  private users = [
    { email: 'alice@example.com', password: 'password123', role: 'student', name: 'Alice' },
    { email: 'bob@example.com', password: 'password123', role: 'student', name: 'Bob' },
    { email: 'examiner@example.com', password: 'password123', role: 'examiner', name: 'Examiner' },
  ];

  authenticateUser(email: string, password: string): Promise<any> {
    return new Promise((resolve, reject) => {
      const user = this.users.find((u) => u.email === email && u.password === password);
      if (user) {
        localStorage.setItem('currentUser', JSON.stringify(user));
        resolve(user);
      } else {
        reject('Invalid email or password');
      }
    });
  }

  getCurrentUser() {
    return JSON.parse(localStorage.getItem('currentUser') || '{}');
  }

  getCurrentUserRole() {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.role : null;
  }

  hasTakenTest() {
    const currentUser = this.getCurrentUser();
    return currentUser ? localStorage.getItem(currentUser.email + '_testTaken') === 'true' : false;
  }

  markTestAsTaken() {
    const currentUser = this.getCurrentUser();
    if (currentUser) {
      localStorage.setItem(currentUser.email + '_testTaken', 'true');
    }
  }
}
