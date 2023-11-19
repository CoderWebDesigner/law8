import { Component, inject } from '@angular/core';
import { LanguageService } from '@core/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-forgetpassword',
  templateUrl: './forgetpassword.component.html',
  styleUrls: ['./forgetpassword.component.scss']
})
export class ForgetpasswordComponent {
  _languageService = inject(LanguageService)
  activeIndex: number = 0;
  items: MenuItem[] = [
    {
      label: this._languageService.getTransValue('auth.userIdAndEmail'),
    },
    {
      label: this._languageService.getTransValue('auth.verify'),
    },
    {
      label: this._languageService.getTransValue('auth.newPassword'),
    }
  ];
  setActiveIndex(index:number){
    this.activeIndex = index;
    this.items[this.activeIndex - 1].styleClass = 'visited';
    // Remove visited Class from steps more OR equal activeStep
    this.items.map((step,index)=>{
      if(this.activeIndex<=index){
        delete step.styleClass
      }
    })
  }
  onStepChanged(newStep: number) {

  }
}
