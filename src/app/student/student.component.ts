import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  exams: any[] = [];
  studentAnswers: { [examTitle: string]: string } = {};
  currentUser: any;

  constructor(
    private examService: ExamService,
    private userService: UserService,
    private router: Router
  ) {}

  ngOnInit(): void {
    // Get the current logged-in user
    this.currentUser = this.userService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    // Get the list of available exams from ExamService
    this.exams = this.examService.getExams();

    // Check if the current user has already taken the test
    this.checkTestStatus();
  }

  // Check if the user has already taken the test
  checkTestStatus() {
    if (this.userService.hasTakenTest()) {
      alert('You have already taken the test.');
    }
  }

  // Submit an answer for an exam
  submitAnswer(exam: any) {
    const answer = this.studentAnswers[exam.title];
    if (answer) {
      const studentName = this.currentUser.name;

      // Record the student's response
      this.examService.recordResponse(studentName, exam.title, answer);

      // Mark the test as taken
      this.userService.markTestAsTaken();

      alert(`Your answer "${answer}" for "${exam.title}" has been submitted.`);
    } else {
      alert('Please select an answer before submitting.');
    }
  }
}
