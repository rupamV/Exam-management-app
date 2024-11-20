import { Component } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-examiner',
  templateUrl: './examiner.component.html',
  styleUrls: ['./examiner.component.css'],
})
export class ExaminerComponent {
  exams: any;
  responses: any;
  newExam = { title: '', question: '', options: ['Yes', 'No'] };

  constructor(
    private examService: ExamService,
    private auth: AuthService,
  ) {
    this.refreshData();
  }

  async addExam() {
    if (this.newExam.title && this.newExam.question) {
      await this.examService.addExam(this.newExam);
      this.newExam = { title: '', question: '', options: ['Yes', 'No'] };
      this.refreshData();
    } else {
      alert('Please fill in all fields.');
    }
  }

  async deleteExam(exam: any) {
    await this.examService.deleteExam(exam);
    this.refreshData();
  }

  async refreshData() {
    debugger;
    this.exams = await this.examService.getExams();
    this.responses = await this.examService.getResponses();
  }

  logout() {
    this.auth.logout();
  }
}
