import { Directive, TemplateRef, ViewContainerRef, Input } from '@angular/core';

@Directive({
  selector: '[ngxUnless]'
})
export class NgxUnlessDirective {
  // @Input()
  // ngxUnless: boolean

  // alternatively
  visible = false;

  @Input()
  set ngxUnless(cond: boolean) {
    if (!cond && !this.visible) {
      this.viewContainerRef.createEmbeddedView(this.templateRef);
      this.visible = true;
    } else if (cond && this.visible) {
      this.viewContainerRef.clear();
      this.visible = false;
    }
  }

  constructor(
    private templateRef: TemplateRef<any>,
    private viewContainerRef: ViewContainerRef
  ) {}
}
