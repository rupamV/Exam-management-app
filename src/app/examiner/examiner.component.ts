import { Component } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.css'],
})
export class ExaminerComponent {
  exams: any[];
  responses: any[];
  newExam = { title: '', question: '', options: ['Yes', 'No'] };

  constructor(private examService: ExamService) {
    this.exams = this.examService.getExams();
    this.responses = this.examService.getResponses();
  }

  addExam() {
    if (this.newExam.title && this.newExam.question) {
      this.examService.addExam(this.newExam);
      this.newExam = { title: '', question: '', options: ['Yes', 'No'] };
    } else {
      alert('Please fill in all fields.');
    }
  }

  deleteExam(exam: any) {
    this.examService.deleteExam(exam);
    this.exams = this.examService.getExams(); // Update the local list after deletion
  }
}