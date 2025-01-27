import { Component, Input } from '@angular/core';
import { Course } from '../../../interfaces/course.interface';
import { CommonModule } from '@angular/common';
import { NgxPaginationModule } from 'ngx-pagination';
import { CourseCardComponent } from '../../../../shared/components/course-card/course-card.component';
@Component({
  selector: 'app-courses',
  standalone: true,
  imports: [CommonModule, CourseCardComponent, NgxPaginationModule],
  templateUrl: './courses.component.html',
  styleUrl: './courses.component.scss'
})
export class CoursesComponent {

  @Input()  array:Course[]=[]

  currentPage : number = 1;
  pageSize : number = 4 ;

}
