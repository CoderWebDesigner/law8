import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import {  finalize } from 'rxjs';

@Component({
  selector: 'app-lookups-sub-matter-category',
  templateUrl: './lookups-sub-matter-category.component.html',
  styleUrls: ['./lookups-sub-matter-category.component.scss'],
  standalone:true,
  imports:[FormlyConfigModule,SharedModule]
})
export class LookupsSubMatterCategoryComponent
  extends FormBaseClass
  implements OnInit
{
  title: string;
  config = inject(DynamicDialogConfig);
  dialogRef = inject(DynamicDialogRef);
  apiUrl = API_Config.general;
  ngOnInit(): void {
    console.log(this.config.data);
    if (this.config.data?.rowData) {

      this.formlyModel = { ...this.config.data?.rowData };
    }
    console.log(this.config.data?.rowData);
    this.getLookupsData();
  }
  override getLookupsData(): void {
      
      this._apiService.get(this.apiUrl.getMatterCategoriesLookup)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => (this.isLoading = false))
      )
      .subscribe({
        next: (res: ApiRes) => {
          console.log(res);
          this.lookupsData = res['result'];
          console.log(this.lookupsData.map(obj=>({label:obj.name,value:obj.id})))
          this.initForm();
        },
      });
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type:'select',
        key:'mtrCatId',
        className:'col-md-4',
        props:{
          label:this._languageService.getTransValue('common.matterCategory'),
          options:this.lookupsData.map(obj=>({label:obj.name,value:obj.id}))
        }
      },
      {
        type: 'input',
        key: 'appealPeriod',
        className: 'col-md-4',
        props: {
          type: 'number',
          label: this._languageService.getTransValue('lookups.appealPeriod'),
        },
      },
      {
        type: 'input',
        key: 'cassationPeriod',
        className: 'col-md-4',
        props: {
          type: 'number',
          label: this._languageService.getTransValue('lookups.cassationPeriod'),
        },
      },
      {
        key: 'nameEn',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required: this._languageService.getSelectedLanguage()=='en',
        },
        validators: {
          validation: ['englishLetters'],
        },
      },
      {
        key: 'nameAr',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameAR'),
          required: this._languageService.getSelectedLanguage()=='ar',
        },
        validators: {
          validation: ['arabicLetters'],
        },
      },
      {
        key: 'active',
        type: 'switch',
        defaultValue: false,
        props: {
          label: this._languageService.getTransValue('lookups.active'),
          class: 'd-block',
        },
      },
    ];
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;

    console.log(this.formlyModel);
    const successMsgKey = this.config?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const requestPayload = this.config?.data?.rowData
      ? { ...this.formlyModel, id: this.config?.data?.rowData?.id }
      : this.formlyModel;
    const path = this.config?.data?.rowData
      ? API_Config.matterCategoryType.update
      : API_Config.matterCategoryType.create;

    // console.log(requestPayload);
    this._apiService
      .post(path, this.formlyModel)
      .pipe(
        finalize(() => (this.isSubmit = false)),
        this.takeUntilDestroy()
      )
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey);
            this._toastrNotifiService.displaySuccessMessage(text);
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this.dialogRef.close(dialog);
            });
          }
        },
      });
  }
}
