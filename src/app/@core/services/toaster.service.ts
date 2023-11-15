import { Injectable, Injector, inject } from '@angular/core';
import { ToastrService } from 'ngx-toastr';

@Injectable({ providedIn: 'root' })
export class ToasterService {

  /** Use Toastr Service */
  toastr: ToastrService = inject(ToastrService);



  displaySuccessMessage(message: string) {
    /** Clear current toastr to display the new one */
    if (this.toastr) {
      if (this.toastr.currentlyActive) {
        this.toastr.clear();
      }
      const positionClass = 'toast-top-right';
      /** show Toastr with recieved message */
      this.toastr.success(message, undefined, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        positionClass,
      });
    }
  }

  displayErrorToastr(message: string) {
    /** Clear current toastr to display the new one */
    if (this.toastr) {
      if (this.toastr.currentlyActive) {
        this.toastr.clear();
      }
      const positionClass = 'toast-top-right';
      /** show Toastr with recieved message */
      this.toastr.error(message, undefined, {
        timeOut: 5000,
        extendedTimeOut: 5000,
        positionClass,
      });
    }
  }
}
