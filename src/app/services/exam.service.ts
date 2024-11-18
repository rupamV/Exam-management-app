import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examsKey = 'exams';
  private responsesKey = 'responses';

  constructor() {
    // Ensure exams and responses are initialized in localStorage if not already present
    if (!localStorage.getItem(this.examsKey)) {
      localStorage.setItem(this.examsKey, JSON.stringify([]));
    }
    if (!localStorage.getItem(this.responsesKey)) {
      localStorage.setItem(this.responsesKey, JSON.stringify([]));
    }
  }

  // Get all exams stored in localStorage
  getExams() {
    return JSON.parse(localStorage.getItem(this.examsKey) || '[]');
  }

  // Get all responses stored in localStorage
  getResponses() {
    return JSON.parse(localStorage.getItem(this.responsesKey) || '[]');
  }

  // Add a new exam to localStorage
  addExam(exam: { title: string; question: string; options: string[] }) {
    const exams = this.getExams();
    exams.push(exam);
    localStorage.setItem(this.examsKey, JSON.stringify(exams));
  }

  // Delete an exam by its title
  deleteExam(exam: { title: string }) {
    const exams = this.getExams();
    const updatedExams = exams.filter((e: { title: string; }) => e.title !== exam.title);
    localStorage.setItem(this.examsKey, JSON.stringify(updatedExams));
  }

  // Record a student's response for an exam
  recordResponse(studentName: string, examTitle: string, answer: string) {
    const responses = this.getResponses();
    // Prevent a student from submitting multiple answers for the same exam
    if (!this.hasSubmittedResponse(studentName, examTitle)) {
      responses.push({ studentName, examTitle, answer });
      localStorage.setItem(this.responsesKey, JSON.stringify(responses));
    } else {
      alert('You have already submitted your answer for this exam.');
    }
  }

  // Check if a student has already submitted an answer for a specific exam
  private hasSubmittedResponse(studentName: string, examTitle: string): boolean {
    const responses = this.getResponses();
    return responses.some(
      (response: { studentName: string; examTitle: string; }) => response.studentName === studentName && response.examTitle === examTitle
    );
  }

  // Check if a student has already taken a test (by student name)
  hasTakenTest(studentName: string): boolean {
    const responses = this.getResponses();
    return responses.some((response: { studentName: string; }) => response.studentName === studentName);
  }

  // Get responses for a particular exam
  getExamResponses(examTitle: string) {
    const responses = this.getResponses();
    return responses.filter((response: { examTitle: string; }) => response.examTitle === examTitle);
  }
}
