import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { Component, Input, OnInit } from '@angular/core';
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

  ngOnInit(): void {
    this.initForm();
  }

  override initForm(): void {
    this.formlyFields = [
      {
        key: this.searchKey,
        type: 'input',
        props: {
          placeholder: this._languageService.getTransValue('common.search'),
          icon: 'fat fat-search',
          class: 'p-inputtext-sm',
        },
      },
    ];

    this.getData();
  }

  override onSubmit(): void {
    console.log(this.formlyModel);
  }
}
