import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { Component, Input, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { SharedTableService } from '../shared-table/services/table.service';

@Component({
  selector: 'shared-search-input',
  templateUrl: './shared-search-input.component.html',
  styleUrls: ['./shared-search-input.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule],
})
export class SharedSearchInputComponent
  extends FormBaseClass
  implements OnInit
{
  @Input() searchKey: string;

  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.formlyFields = [
      {
        key: 'search',
        type: 'input',
        props: {
          placeholder: this._languageService.getTransValue('common.search'),
          icon: 'pi pi-search',
          class: 'p-inputtext-sm',
          onKeyUp:()=>{
            this._sharedTableService.search$.next(this.formlyModel.search)
          }
        },
      },
    ];

    this.getData();
  }

  override onSubmit(): void {
    this._sharedTableService.search$.next(this.formlyModel.search)
  }
}
