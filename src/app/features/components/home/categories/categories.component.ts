import { CommonModule } from '@angular/common';
import { Component, EventEmitter, Input, Output } from '@angular/core';
import { Category } from '../../../interfaces/categories.interafce';

@Component({
  selector: 'app-categories',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './categories.component.html',
  styleUrl: './categories.component.scss'
})
export class CategoriesComponent {
  
  @Input() array: Category[] = [];

  @Output() filterItem:EventEmitter<number>= new EventEmitter()

  category:number = 0;

  filter(id:number){
    this.filterItem.emit(id)
    this.category=id;
  }

}
