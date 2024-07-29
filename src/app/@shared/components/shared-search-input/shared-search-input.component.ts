import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';

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
  @Output() onSearch = new EventEmitter<string>();



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
          keyup:(e)=>{
            this.onSearch.emit(this.formlyModel.search)
            this._sharedTableService.search$.next(this.formlyModel.search)
          }
        },
      },
    ];
  }

  override onSubmit(): void {
    this.onSearch.emit(this.formlyModel.search)
    this._sharedTableService.search$.next(this.formlyModel.search)

  }


}
