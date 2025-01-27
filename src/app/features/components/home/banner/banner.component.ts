import { Component, CUSTOM_ELEMENTS_SCHEMA, Input } from '@angular/core';
import { IconsService } from '../../../../shared/services/icons.service';
import { Banner } from '../../../interfaces/banner.interface';
import { SetSpanColorDirective } from '../../../directives/set-span-color.directive';

@Component({
  selector: 'app-banner',
  standalone: true,
  imports: [SetSpanColorDirective],
  templateUrl: './banner.component.html',
  styleUrl: './banner.component.scss',
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class BannerComponent {
  @Input() Banners:Banner[]=[]

  constructor(public iconService:IconsService) { }
}
