import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedService } from '@shared/services/shared.service';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { finalize, forkJoin } from 'rxjs';
@Component({
  selector: 'app-lookups-main-matter-category',
  templateUrl: './lookups-main-matter-category.component.html',
  styleUrls: ['./lookups-main-matter-category.component.scss'],
  standalone: true,
  imports: [CommonModule, SharedModule, FormlyConfigModule],
})
export class LookupsMainMatterCategoryComponent
  extends FormBaseClass
  implements OnInit
{
  title: string;
  itemId: number;
  config = inject(DynamicDialogConfig);
  _sharedService = inject(SharedService);
  dialogRef = inject(DynamicDialogRef)
  apiUrl=API_Config.general
  ngOnInit(): void {
    console.log(this.config.data)
    if (this.config.data.formType!='add') {
      this.itemId = +this.config.data?.rowData?.id;
      this.formlyModel = {...this.config.data?.rowData};
    }
    console.log(this.config.data?.rowData);
    this.getLookupsData()
    
  }
  override getLookupsData(): void {
    this._apiService.get(this.apiUrl.getPractsAreaLookup)
    .pipe(
      this._sharedService.takeUntilDistroy(),
      finalize(()=>this.isLoading=false)
    ).subscribe({
      next:(res:ApiRes)=>{
        console.log(res)
        this.lookupsData=res['result']
        this.initForm();
      }
    })
  }
  override initForm(): void {
    this.formlyFields = [
      {
        type: 'select',
        key: 'practsAreaId',
        className: 'col-md-4',
        props: {
          label: this._languageService.getTransValue('common.practiceArea'),
          // options: [
          //   { label: 'Corporate', value: 'Corporate' },
          //   { label: 'Litigation', value: 'Litigation' },
          //   { label: 'instructor', value: 'instructor' },
          // ],
          options:this.lookupsData.map(obj=>({label:obj.name,value:obj.id}))
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

    console.log(this.formlyModel)
    const successMsgKey = this.itemId
      ? 'message.updateSuccessfully'
      : 'message.createdSuccessfully';
    const requestPayload = this.itemId
      ? { ...this.formlyModel, id: this.itemId }
      : this.formlyModel;
    const path = this.itemId
      ? API_Config.matterCategory.update
      : API_Config.matterCategory.create;

    console.log(requestPayload);
    this._apiService
      .post(path, requestPayload)
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
