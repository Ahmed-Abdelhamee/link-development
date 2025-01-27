import { Component } from '@angular/core';
import { IconsService } from '../../../shared/services/icons.service';

@Component({
  selector: 'app-footer',
  standalone: true,
  imports: [],
  templateUrl: './footer.component.html',
  styleUrl: './footer.component.scss'
})
export class FooterComponent {

  constructor(public iconService:IconsService){}
}
