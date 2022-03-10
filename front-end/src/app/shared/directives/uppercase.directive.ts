import { AfterViewInit, Directive, ElementRef, HostListener, Renderer2 } from '@angular/core';

@Directive({
  selector: '[appUpperCase]'
})
export class UppercaseDirective implements AfterViewInit {
  inputWrapper: HTMLElement = null;

  input: HTMLInputElement = null;

  constructor(
    el: ElementRef,
    private renderer: Renderer2
  ) {
    if (el.nativeElement.nodeName === 'INPUT') {
      this.input = el.nativeElement;
      return;
    }

    if (el.nativeElement.nodeName === 'P-AUTOCOMPLETE') {
      this.inputWrapper = el.nativeElement;
    }
  }

  @HostListener('keyup', ['$event'])
  onKeyDown() {
    const valorInput = this.input.value.toUpperCase();
    this.renderer.setProperty(this.input, 'value', valorInput);
  }

  ngAfterViewInit() {
    if (!this.inputWrapper) { return; }

    const input = this.inputWrapper.querySelector('input');

    if (input) {
      this.input = input;
    }
  }
}
