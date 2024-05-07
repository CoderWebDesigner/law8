import { Directive, ElementRef, Input, OnInit, Renderer2 } from '@angular/core';
import { PermissionService } from '@core/services/permission.service';

@Directive({
  selector: '[permission]'
})
export class PermissionDirective implements OnInit{
  @Input() permission?:string;
  constructor(
    private elementRef:ElementRef,
    private renderer:Renderer2,
    private _permissionService:PermissionService
  ) { }
  ngOnInit(): void {
    if(this.permission && this._permissionService.hasPermission(this.permission)){
      this.updateElement()
    }
  }
  
  updateElement(){
    if(!this._permissionService.hasPermission(this.permission)){
      this.renderer.removeChild(this.elementRef.nativeElement.parentElement,this.elementRef.nativeElement)
    }
  }
  

}
