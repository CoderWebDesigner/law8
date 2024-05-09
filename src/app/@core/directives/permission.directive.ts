import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PermissionService } from '@core/services/permission.service';

@Directive({
  selector: '[requiredPermission]',
})
export class PermissionDirective implements OnInit {
  @Input() requiredPermission?: string;
  constructor(
    private elementRef: ElementRef,
    private renderer: Renderer2,
    private _permissionService: PermissionService
  ) {}
  ngOnInit(): void {
    if (this.requiredPermission) {
      this.updateElement();
    }
  }
  updateElement() {
    if (!this._permissionService.hasPermission(this.requiredPermission)) {
      this.renderer.removeChild(
        this.elementRef.nativeElement.parentElement,
        this.elementRef.nativeElement
      );
    }
  }
}
