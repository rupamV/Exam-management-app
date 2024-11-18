import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class ExamService {
  private exams = [
    {
      title: 'Angular Basics',
      questions: ['What is a component in Angular?', 'Explain *ngIf and *ngFor.'],
      duration: 30,
    },
    {
      title: 'TypeScript Essentials',
      questions: ['What are interfaces in TypeScript?', 'Calculate sum of an array.'],
      duration: 40,
    },
  ];

  private results: { examTitle: string; score: number }[] = [];

  getExams() {
    return this.exams;
  }

  updateExam(updatedExam: any) {
    const index = this.exams.findIndex((e) => e.title === updatedExam.title);
    if (index !== -1) {
      this.exams[index] = updatedExam;
    }
  }

  deleteExam(exam: any) {
    this.exams = this.exams.filter((e) => e.title !== exam.title);
  }

  recordResult(examTitle: string, score: number) {
    this.results.push({ examTitle, score });
  }

  getResults() {
    return this.results;
  }
}
