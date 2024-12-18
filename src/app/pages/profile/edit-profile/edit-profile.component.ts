import {
  Component,
  EventEmitter,
  Input,
  OnChanges,
  Output,
  SimpleChanges,
  inject,
} from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes, User } from '@core/models';
import { StorageService } from '@core/services';
import { finalize } from 'rxjs';
import { ResetPasswordComponent } from '../reset-password/reset-password.component';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss'],
})
export class EditProfileComponent extends FormBaseClass implements OnChanges {
  @Input({ required: true }) userInfo: User;
  @Output() changeActiveIndex = new EventEmitter<number>();
  @Output() onEdit = new EventEmitter<boolean>();

  _storageService = inject(StorageService);

  ngOnChanges(changes: SimpleChanges): void {
    this.formlyModel = { ...changes['userInfo'].currentValue };
    this.formlyModel.Attachment=this._authService?.user?.Photo
    this.getLookupsData();
  }
  override getLookupsData(): void {
    this._apiService
      .get(API_Config.general.getAssignedUsersTimeSheet)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.lookupsData = res;
          this.initForm();
        },
      });
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-md-6',
            fieldGroupClassName: 'row',
            fieldGroup: [
              {
                key: 'userName',
                type: 'input',
                props: {
                  label:
                    this._languageService.getTransValue('profile.username'),
                  required: true,
                },
              },
              {
                key: 'email',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('common.email'),
                  required: true,
                },
                validators: {
                  validation: ['email'],
                },
              },
              {
                key: 'mobileNo',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue('client.phone'),
                  // required: true,
                },
              },
              {
                type: 'select',
                key: 'defUsrId',
                props: {
                  label: this._languageService.getTransValue('users.defUsrId'),
                  required: true,
                  options: this.lookupsData.result.map((obj) => ({
                    label: obj.name,
                    value: obj.id,
                  })),
                },
              },
            ],
          },
          {
            className: 'col-md-6',
            fieldGroup: [
              {
                key: 'Attachment',
                type: 'attachment',
                // type:'upload-crop',
                className: 'mx-auto',
                props: {
                  btnLabel: 'profile.uploadProfilePic',
                  title: 'profile.uploadProfilePic',
                  subTitle: 'common.dragAndDrop',
                  withCrop:true
                },
              },
            ],
          },
        ],
      },
    ];
  }
  override onSubmit(): void {
    if (this.formly.invalid) {
      this.formly.markAllAsTouched();
      return;
    }
    this.isLoading = true;

    let body = {
      userName: this.formlyModel.userName,
      email: this.formlyModel.email,
      mobileNo: this.formlyModel.mobileNo,
      defUsrId: this.formlyModel.defUsrId,
      Attachment: this.formlyModel.Attachment,
    };
    let formData = new FormData();
    for (const [key, value] of Object.entries(body)) {
      if (key != 'Attachment') {
        formData.append(key, `${value}`);
      }
    }

    formData.append('Attachment', body.Attachment);
    //

    this._apiService
      .post(API_Config.profile.update, formData)
      .pipe(
        finalize(() => (this.isLoading = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(
              'messages.updateSuccessfully'
            );
            this._toastrNotifiService.displaySuccessMessage(text);
            this.onEdit.emit(true);
          }
        },
      });
  }
  onChangeActiveIndex() {
    this._DialogService.open(ResetPasswordComponent,{
      width:'40vw',
      header:this._languageService.getTransValue('profile.resetPassword'),
      data:this.userInfo.id
    })
    // this.changeActiveIndex.emit(2);
  }
}
