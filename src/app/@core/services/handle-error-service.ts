import { Injectable, inject } from "@angular/core";
import { HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { ToastrService } from "ngx-toastr";
import { AuthService } from "./auth.service";

@Injectable({
    providedIn: "root"
})
export class HandleErrorService {

    _authService = inject(AuthService);
    _toastrService = inject(ToastrService);

    // Handling HTTP Errors using Toaster
    public handleError(error: any) {
        if (error instanceof HttpResponse) {

            if (error?.body?.isError && error?.body?.msg) {
                this._toastrService.error(error?.body?.msg)
            }
        }

        if (error instanceof HttpErrorResponse) {
            if (error?.error?.Message)
                this._toastrService.error(error?.error?.Message)
            if (error.status === 401) {
                this._authService.logout()
            }
        }




    }

}