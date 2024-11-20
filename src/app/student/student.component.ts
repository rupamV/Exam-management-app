import { Component, OnInit } from '@angular/core';
import { ExamService } from '../services/exam.service';
import { UserService } from '../services/user.service';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthService } from '../services/auth.service';

@Component({
  standalone: true,
  imports: [CommonModule, FormsModule],
  selector: 'app-student',
  templateUrl: './student.component.html',
  styleUrls: ['./student.component.css'],
})
export class StudentComponent implements OnInit {
  exams: any[] = [];
  studentAnswers: Record<string, string> = {};
  currentUser: any;

  constructor(
    private examService: ExamService,
    private userService: UserService,
    private router: Router,
    private auth: AuthService,
  ) {}

  async ngOnInit(): Promise<void> {
    // Get the current user from local storage or user service
    this.currentUser = this.userService.getCurrentUser();

    // Fetch exams if user is a student
    this.refreshData();
  }

  async checkTestStatus() {
    const hasTaken = await this.userService.hasTakenTest();
    if (hasTaken) {
      alert('You have already taken the test.');
    }
  }

  async submitAnswer(exam: any) {
    const answer = this.studentAnswers[exam.title];

    if (!answer) {
      alert('Please select an answer before submitting.');
      return;
    }

    const isSubmitted = await this.examService.recordResponse(exam.title, answer);

    if (isSubmitted) {
      await this.userService.markTestAsTaken();
      alert(`Your answer "${answer}" for "${exam.title}" has been submitted.`);
    } else {
      alert(`You have already submitted an answer for "${exam.title}".`);
    }
  }

  async refreshData() {
    this.exams = await this.examService.getExams();
    this.checkTestStatus();
  }

  logout() {
    this.auth.logout();
  }
}
