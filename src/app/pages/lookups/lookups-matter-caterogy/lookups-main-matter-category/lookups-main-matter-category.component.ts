import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';
import { finalize } from 'rxjs';
@Component({
  selector: 'app-lookups-main-matter-category',
  templateUrl: './lookups-main-matter-category.component.html',
  styleUrls: ['./lookups-main-matter-category.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule
  ],
})
export class LookupsMainMatterCategoryComponent extends FormBaseClass implements OnInit {
  title: string;
  itemId: number;
  config = inject(DynamicDialogConfig)
  ngOnInit(): void {
    this.initForm()

  }
  override initForm(): void {

    this.formlyFields = [
      {
        type: 'input',
        key: 'Appeal Period',
        className: 'col-md-4',
        props: {
          type: 'number',
          label: this._languageService.getTransValue('lookups.appealPeriod'),
        },
      },
      {
        type: 'input',
        key: 'Cassation Period',
        className: 'col-md-4',
        props: {
          type: 'number',
          label: this._languageService.getTransValue('lookups.cassationPeriod'),
        },
      },
      {
        type: 'select',
        key: 'Practice Area',
        className: 'col-md-4',
        props: {
          label: this._languageService.getTransValue('matters.practiceArea'),
          options: [
            { label: 'Corporate', value: 'Corporate' },
            { label: 'Litigation', value: 'Litigation' },
            { label: 'instructor', value: 'instructor' },
          ],
        },
      },
      {
        key: 'nameEN',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required: true
        },
        validators: {
          validation: ['englishLetters'],
        }
      },
      {
        key: 'nameAR',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameAR'),
          required: true
        },
        validators: {
          validation: ['arabicLetters'],
        }
      },
      {
        key: 'active',
        type: 'switch',
        defaultValue:false,
        props:{
          label:this._languageService.getTransValue('lookups.active'),
          class:'d-block'
        }
      }
    ]
  }
  override onSubmit(): void {
    if(this.formly.invalid) return;
    if (this.config.data)
      this.itemId = +this.config.data?.rowData?.id
    const successMsgKey = (this.itemId) ? 'message.updateSuccessfully' : 'message.createdSuccessfully';
    const requestPayload = (this.itemId) ? { ...this.formlyModel, id: this.itemId } : this.formlyModel
    const path = (this.itemId) ? API_Config.matterCategory.update : API_Config.matterCategory.create

    console.log(requestPayload)
    this._apiService.post(path, requestPayload).pipe(
      finalize(() => this.isSubmit = false),
      this.takeUntilDestroy()
    ).subscribe({
      next: (res: ApiRes) => {
        if (res && res.isSuccess) {
          const text = this._languageService.getTransValue(successMsgKey)
          this._toastrNotifiService.displaySuccessMessage(text)
        }
      }
    })
  }

}
