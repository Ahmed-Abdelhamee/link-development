import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { slider } from '../../../interfaces/slider.interface';

@Component({
  selector: 'app-slider',
  standalone: true,
  imports: [],
  templateUrl: './slider.component.html',
  styleUrl: './slider.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class SliderComponent {
  
  @Input() sliders:slider[]=[]

  constructor() { }
}
