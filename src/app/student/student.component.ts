import { Component } from '@angular/core';
import { ExamService } from '../services/exam.service';

@Component({
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  exams: any[];
  results: any[];

  constructor(private examService: ExamService) {
    this.exams = this.examService.getExams();
    this.results = this.examService.getResults();
  }

  takeExam(exam: any) {
    const score = Math.floor(Math.random() * 100);
    this.examService.recordResult(exam.title, score);
  }
}
