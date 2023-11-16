import { Component, EventEmitter, OnInit, Output } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

@Component({
  selector: 'app-verfiy-step-two',
  templateUrl: './verfiy-step-two.component.html',
  styleUrls: ['./verfiy-step-two.component.scss']
})
export class VerfiyStepTwoComponent extends FormBaseClass implements OnInit {
  @Output() onChange = new EventEmitter<number>()
  ngOnInit() {
    this.initForm();
  }

  initForm() {
    this.formlyFields = [
      {
        key: "otp",
        type: "otp",
        props: {
          class: 'text-center',
        }
      },
    ]
  }


  onSubmit() {
    this.onChange.emit(2)
    // this.isSubmit = true;
    // if (this.formly.invalid) {
    //   this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    //   return;
    // }
    // this._toastrNotifiService.displaySuccessMessage('Successfully Logged in');
    // this._router.navigate(['/auth/otp'])
    // // if (this.checkRole()) {
    // //   this.isSubmit = false
    // //   this._storageService.setStorage('token', "token");
    // //   this._storageService.setStorage('role', this.role);
    // //   this._router.navigate(['/'])
    // // }

  }


}
