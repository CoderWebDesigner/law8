import { Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { User } from '@core/models';
import { StorageService } from '@core/services';

@Component({
  selector: 'app-edit-profile',
  templateUrl: './edit-profile.component.html',
  styleUrls: ['./edit-profile.component.scss']
})
export class EditProfileComponent extends FormBaseClass implements OnChanges{

  @Input({required:true}) userInfo:User;
  @Output() changeActiveIndex = new EventEmitter<number>()
  @Output() onEdit = new EventEmitter<boolean>()
  _storageService = inject(StorageService)
  ngOnChanges(changes: SimpleChanges): void {
    this.formlyModel =  {...changes['userInfo'].currentValue}
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            className:"col-md-6",
            fieldGroupClassName:'row',
            fieldGroup:[
              {
                key: 'username',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue(
                    'profile.username'
                  ),
                  required: true,
                },
              },
              {
                key: 'email',
                type: 'input',
                props: {
                  label: this._languageService.getTransValue(
                    'common.email'
                  ),
                  required: true,
                },
                validators: {
                  validation: ['email'],
                }
              },
              {
                key: 'phoneNumber',
                type: 'phone',
                props: {
                  label: this._languageService.getTransValue(
                    'profile.phone'
                  ),
                  required: true,
                },
              }

            ],
          },
          {
            className:"col-md-6",
            fieldGroup:[
              {
                key: 'photo',
                type: 'attachment',
                className:'mx-auto',
                props: {
                  btnLabel: "profile.uploadProfilePic",
                  title: "profile.uploadProfilePic",
                  subTitle: "common.dragAndDrop"
                },
              }
            ]
          },

        ]
      }
    ]
  }
  override onSubmit(): void {
    // if (this.formly.invalid) {
    //   this.formly.markAllAsTouched();
    //   return;
    // }
    this.isLoading =true

    // this._apiService.put(API_Config.profile.update,body).pipe(
    //   finalize(()=> this.isLoading =false),
    //   this.takeUntilDestroy()
    // ).subscribe({
    //   next:(res:ApiRes)=>{
    //     if (res && !res.error) {
    //       const text = this._languageService.getTransValue('messages.updateSuccessfully');
    //       this._toastrNotifiService.displaySuccess(text);
          this.onEdit.emit(true)
    //     }
    //   }
    // })
  }
  onChangeActiveIndex(){
    this.changeActiveIndex.emit(2)
  }

}
