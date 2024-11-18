import { Component } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  imports: [CommonModule,FormsModule],
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent {
  studentAnswers: { [examTitle: string]: string } = {};
  exams: any;

  constructor(private examService: ExamService) {
    this.exams = this.examService.getExams();
  }

  submitAnswer(exam: any) {
    const answer = this.studentAnswers[exam.title];
    if (answer) {
      const studentName = prompt('Enter your name:'); // Prompting for the student name
      if (studentName) {
        this.examService.recordResponse(studentName, exam.title, answer);
        alert(`Your answer "${answer}" for "${exam.title}" has been submitted.`);
      } else {
        alert('Name is required to submit the exam.');
      }
    } else {
      alert('Please select an answer before submitting.');
    }
  }
}