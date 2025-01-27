import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { Course } from '../../interfaces/course.interface';
import { MenuItem } from 'primeng/api';
import { BreadcrumbModule } from 'primeng/breadcrumb';
import { RouterModule } from '@angular/router';
import { NgbRating } from '@ng-bootstrap/ng-bootstrap';
import { PricePipe } from '../../../core/pipes/price.pipe';
import { IconsService } from '../../../shared/services/icons.service';
import { Store } from '@ngrx/store';
import { addToCart } from '../../../core/store/cart.actions';

@Component({
  selector: 'app-course-details',
  standalone: true,
  imports: [CommonModule,BreadcrumbModule, RouterModule, NgbRating, PricePipe],
  templateUrl: './course-details.component.html',
  styleUrl: './course-details.component.scss'
})
export class CourseDetailsComponent {

  item : Course ;
  
  home: MenuItem | undefined;
  
  items :any[]=[]
  
  constructor(public iconService : IconsService, private store : Store){
    this.item =history.state;
  }
  
  ngOnInit() {
      this.items = [
          { label: 'home' , route:'/home' },
          { label: this.item.title },
      ];
  }

  addToCart(item:Course){
    this.store.dispatch(addToCart(item))
  }

}
