import { Injectable } from '@angular/core';
import { Firestore, collection, addDoc, getDocs, deleteDoc, doc, query, where } from '@angular/fire/firestore';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  constructor(private firestore: Firestore) {}

  // Get all exams from Firestore
  async getExams() {
    const examsCollection = collection(this.firestore, 'exams');
    const querySnapshot = await getDocs(examsCollection);
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Get all responses from Firestore
  async getResponses() {
    const responsesCollection = collection(this.firestore, 'responses');
    const querySnapshot = await getDocs(responsesCollection);
    return querySnapshot.docs.map(doc => doc.data());
  }

  // Add a new exam to Firestore
  async addExam(exam: { title: string; question: string; options: string[] }) {
    const examsCollection = collection(this.firestore, 'exams');
    await addDoc(examsCollection, exam);
  }

  // Delete an exam by its title
  async deleteExam(exam: { title: string }) {
    const examsCollection = collection(this.firestore, 'exams');
    const q = query(examsCollection, where('title', '==', exam.title));
    const querySnapshot = await getDocs(q);

    for (const examDoc of querySnapshot.docs) {
      const examRef = doc(this.firestore, 'exams', examDoc.id);
      await deleteDoc(examRef);
    }
  }

  // Record a student's response for an exam
  async recordResponse(examTitle: string, answer: string): Promise<boolean> {
    const currentUser = JSON.parse(localStorage.getItem('currentUser') || '{}');
    const email = currentUser?.email;  // Use email as unique identifier

    if (!email) {
      throw new Error('No user is logged in.');
    }

    const alreadySubmitted = await this.hasSubmittedResponse(email, examTitle);
    if (alreadySubmitted) return false;

    const responsesCollection = collection(this.firestore, 'responses');
    await addDoc(responsesCollection, { studentEmail: email, examTitle, answer });
    return true;
  }

  // Check if a student has already submitted an answer for a specific exam
  async hasSubmittedResponse(studentEmail: string, examTitle: string): Promise<boolean> {
    const responsesCollection = collection(this.firestore, 'responses');
    const q = query(responsesCollection, where('studentEmail', '==', studentEmail), where('examTitle', '==', examTitle));
    const querySnapshot = await getDocs(q);
    return !querySnapshot.empty;
  }

  // Get all responses for a particular exam
  async getExamResponses(examTitle: string) {
    const responsesCollection = collection(this.firestore, 'responses');
    const q = query(responsesCollection, where('examTitle', '==', examTitle));
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map(doc => doc.data());
  }
}
