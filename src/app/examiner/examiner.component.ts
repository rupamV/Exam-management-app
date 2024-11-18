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
  exams: any;
  selectedExam: any = null;

  constructor(private examService: ExamService) {
    this.exams = this.examService.getExams();
  }

  editExam(exam: any) {
    this.selectedExam = { ...exam };
  }

  updateExam() {
    this.examService.updateExam(this.selectedExam);
    this.selectedExam = null;
  }

  deleteExam(exam: any) {
    this.examService.deleteExam(exam);
  }
}
