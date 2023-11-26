import { Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appShowHidePassword]'
})
export class ShowHidePasswordDirective {

  private type = 'password';

  constructor(private el: ElementRef, private renderer: Renderer2) {}

  @HostListener('click')
  onClick() {
    this.type = this.type === 'password' ? 'text' : 'password';
    this.renderer.setAttribute(this.el.nativeElement, 'type', this.type);
  }
}
