import { Component, OnInit } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-setting',
  templateUrl: './setting.component.html',
  styleUrls: ['./setting.component.scss']
})
export class SettingComponent  extends FormBaseClass implements OnInit{
  ngOnInit(): void {
    this.getData()
   
  }
  override initForm(): void {
    this.formlyFields=[
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            template: `<h5 class="my-4 line-title overflow-hidden"> <span class="me-3">${this._languageService.getTransValue(
              'setting.accountSystemIntegration'
            )}</span></h5>`,
          },
          {
            type:'checkbox',
            key:'isSapIntegration',
            className:'col-12',
            props:{
              label:this._languageService.getTransValue(
                'setting.sapAccountingSystem'
              )
            }
          },
          {
            type:'input',
            className:'col-md-6',
            key:'sapUrl',
            props:{
              label:this._languageService.getTransValue(
                'setting.serverName'
              )
            },
             expressions: {
        'props.disabled': '!model.isSapIntegration',
      },
          },
          {
            type:'input',
            className:'col-md-6',
            key:'sapDatabase',
            props:{
              label:this._languageService.getTransValue(
                'setting.databaseName'
              )
            },
             expressions: {
        'props.disabled': '!model.isSapIntegration',
      },
          },
          {
            type:'input',
            className:'col-md-6',
            key:'userName',
            props:{
              label:this._languageService.getTransValue(
                'common.username'
              )
            },
             expressions: {
        'props.disabled': '!model.isSapIntegration',
      },
          },
          {
            type:'input',
            className:'col-md-6',
            key:'password',
            props:{
              label:this._languageService.getTransValue(
                'common.password'
              )
            },
             expressions: {
        'props.disabled': '!model.isSapIntegration',
      },
          }
        ]
      }
    ]
  }
  override getData(): void {
      this._apiService.post(API_Config.setting.get,null).pipe(
        this._sharedService.takeUntilDistroy()
      ).subscribe({
        next:(res:ApiRes)=>{
          this.formlyModel=res['result']
          this.initForm()
        }
      })
  }
  override onSubmit(): void {
    this.isLoading = true;
      this._apiService.post(API_Config.setting.create, this.formlyModel).pipe(
      finalize(() => this.isLoading = false) 
    ).subscribe({
      next: (res: any) => {
        if (res.isSuccess) {
          // this.formlyModel = res.result
          const text = this._languageService.getTransValue('messages.createdSuccessfully');
          this._toastrNotifiService.displaySuccessMessage(text);
        } else {
          this._toastrNotifiService.displayErrorToastr(res.message);
        }
      },
      error: (err: any) => {
        this._toastrNotifiService.displayErrorToastr('An error occurred while updating settings.');
      }
    });
  }
  
  

}
