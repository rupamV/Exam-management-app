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
    private router: Router,
  ) {}

  ngOnInit(): void {
    this.currentUser = this.userService.getCurrentUser();

    if (!this.currentUser) {
      this.router.navigate(['/login']);
      return;
    }

    this.exams = this.examService.getExams();
    this.checkTestStatus();
  }

  checkTestStatus() {
    if (this.userService.hasTakenTest()) {
      alert('You have already taken the test.');
    }
  }

  submitAnswer(exam: any) {
    const answer = this.studentAnswers[exam.title]; 
    const studentName = this.currentUser.name; 
  
    if (!answer) {
      alert('Please select an answer before submitting.');
      return;
    }
  
    const isSubmitted = this.examService.recordResponse(studentName, exam.title, answer);
  
    if (isSubmitted) {
      this.userService.markTestAsTaken(); 
      alert(`Your answer "${answer}" for "${exam.title}" has been submitted.`);
    } else {
      alert(`You have already submitted an answer for "${exam.title}".`);
    }
  }
  
  logout() {
    localStorage.removeItem('currentUser');
    this.router.navigate(['/homepage']);
  }
}
