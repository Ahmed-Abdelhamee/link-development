import { Directive, ElementRef, Input, OnChanges, Renderer2, SimpleChanges } from '@angular/core';

@Directive({
  selector: '[SetSpanColor]',
  standalone: true
})
export class SetSpanColorDirective implements OnChanges {

  @Input() colorCode:string=''

  constructor(private el:ElementRef, private render:Renderer2) { }

  ngOnChanges(changes: SimpleChanges): void {
    let spans = this.el.nativeElement.querySelectorAll('span')
    spans.forEach((element:HTMLElement) => {
      this.render.setStyle(element,'color','#'+this.colorCode);
    });
  }

}
