import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private examsKey = 'exams';
  private responsesKey = 'responses';

  constructor() {
    // Initialize localStorage for exams and responses if not present
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
    const updatedExams = exams.filter(
      (e: { title: string }) => e.title !== exam.title
    );
    localStorage.setItem(this.examsKey, JSON.stringify(updatedExams));
  }

  // Record a student's response for an exam
  recordResponse(studentName: string, examTitle: string, answer: string): boolean {
    const responses = this.getResponses();
    const alreadySubmitted = this.hasSubmittedResponse(studentName, examTitle);

    if (alreadySubmitted) {
      // Don't allow submission if already submitted
      return false;
    }

    // Add the response to storage if not already submitted
    responses.push({ studentName, examTitle, answer });
    localStorage.setItem(this.responsesKey, JSON.stringify(responses));
    return true;
  }

  // Check if a student has already submitted an answer for a specific exam
  private hasSubmittedResponse(
    studentName: string,
    examTitle: string
  ): boolean {
    const responses = this.getResponses();
    return responses.some(
      (response: { studentName: string; examTitle: string }) =>
        response.studentName === studentName && response.examTitle === examTitle
    );
  }

  // Check if a student has already taken any test
  hasTakenTest(studentName: string): boolean {
    const responses = this.getResponses();
    return responses.some(
      (response: { studentName: string }) =>
        response.studentName === studentName
    );
  }

  // Get responses for a particular exam
  getExamResponses(examTitle: string) {
    const responses = this.getResponses();
    return responses.filter(
      (response: { examTitle: string }) => response.examTitle === examTitle
    );
  }
}
