import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private exams = [
    {
      title: 'Are you a boy?',
      question: 'Are you a boy?',
      options: ['Yes', 'No'],
    },
    {
      title: 'Are you a girl?',
      question: 'Are you a girl?',
      options: ['Yes', 'No'],
    },
  ];

  private responses: { studentName: string; examTitle: string; answer: string }[] = [];

  getExams() {
    return this.exams;
  }

  addExam(exam: { title: string; question: string; options: string[] }) {
    this.exams.push(exam);
  }

  deleteExam(exam: any) {
    this.exams = this.exams.filter((e) => e.title !== exam.title);
  }

  recordResponse(studentName: string, examTitle: string, answer: string) {
    this.responses.push({ studentName, examTitle, answer });
  }

  getResponses() {
    return this.responses;
  }
}
