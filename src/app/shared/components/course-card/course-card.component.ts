import { CommonModule } from '@angular/common';
import { Component, Input } from '@angular/core';
import { Course } from '../../../features/interfaces/course.interface';
import { RouterModule } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';

@Component({
  selector: 'app-course-card',
  standalone: true,
  imports: [CommonModule , RouterModule, NgbRating],
  templateUrl: './course-card.component.html',
  styleUrl: './course-card.component.scss'
})
export class CourseCardComponent {
  @Input() item : Course = {} as Course
}
