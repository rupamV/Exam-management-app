import { Injectable } from '@angular/core';
import { Firestore, doc, setDoc, getDoc, collection, query, where, getDocs } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class UserService {
  constructor(private firestore: Firestore) {}

  // Authenticate user by email and password
  async authenticateUser(email: string, password: string): Promise<any> {
    const usersCollection = collection(this.firestore, 'users');
    const q = query(usersCollection, where('email', '==', email), where('password', '==', password)); // This could be modified for security if needed
    const querySnapshot = await getDocs(q);

    if (!querySnapshot.empty) {
      const user = querySnapshot.docs[0].data();
      // Store the user in localStorage after successful authentication
      localStorage.setItem('currentUser', JSON.stringify(user));
      return user;
    } else {
      throw new Error('Invalid email or password');
    }
  }

  // Retrieve the current user from localStorage
  getCurrentUser() {
    const currentUser = localStorage.getItem('currentUser');
    return currentUser ? JSON.parse(currentUser) : null; // Return null if no currentUser is in localStorage
  }

  // Get the current user's role from localStorage
  getCurrentUserRole() {
    const currentUser = this.getCurrentUser();
    return currentUser ? currentUser.role : null; // Return the role if user exists
  }

  // Check if the current user has taken the test
  async hasTakenTest(): Promise<boolean> {
    const currentUser = this.getCurrentUser();
    if (!currentUser || !currentUser.email) return false;

    const userDocRef = doc(this.firestore, 'users', currentUser.email); // Use the email to reference user document
    const docSnapshot = await getDoc(userDocRef);

    // Check if the document exists and if the user has the 'testTaken' field set to true
    return docSnapshot.exists() && docSnapshot.data()?.['testTaken'] === true;
  }

  // Mark the test as taken for the current user
  async markTestAsTaken(): Promise<void> {
    const currentUser = this.getCurrentUser();
    if (currentUser && currentUser.email) {
      const userDocRef = doc(this.firestore, 'users', currentUser.email);
      // Update the 'testTaken' field in Firestore
      await setDoc(userDocRef, { testTaken: true }, { merge: true });
    }
  }
}
