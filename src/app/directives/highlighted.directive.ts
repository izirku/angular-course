import {
  Directive,
  HostBinding,
  Input,
  HostListener,
  Output,
  EventEmitter
} from '@angular/core';

@Directive({
  selector: '[highlighted]',
  exportAs: 'hl'
})
export class HighlightedDirective {
  @Input('highlighted')
  isHighlighted = false;

  @Output()
  toggleHighlight = new EventEmitter();

  @HostListener('mouseover')
  mouseOver() {
    this.isHighlighted = true;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  @HostListener('mouseleave')
  mouseLeave() {
    this.isHighlighted = false;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  toggle() {
    this.isHighlighted = !this.isHighlighted;
    this.toggleHighlight.emit(this.isHighlighted);
  }

  // affect STYLES

  // @HostBinding('style.border')
  // get moreCSS() {
  //   return '2px solid green';
  // }

  // affect CLASSES
  @HostBinding('class.highlighted')
  get cssClasses() {
    return this.isHighlighted;
  }
  // same as:
  // @HostBinding('className')
  // get cssClasses() {
  //   return 'highlighted';
  // }

  // affect HTML ATTRIBUTES
  // @HostBinding('attr.disabled')
  // get disabled() {
  //   return 'true';
  // }

  constructor() {
    console.log('highlighted');
  }
}
