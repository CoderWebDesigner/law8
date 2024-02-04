import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';

@Component({
  selector: 'app-lookups-main-item-editor',
  templateUrl: './lookups-main-item-editor.component.html',
  styleUrls: ['./lookups-main-item-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule
  ],
})
export class LookupsMainItemEditorComponent extends FormBaseClass implements OnInit {
  title: string;
  itemId: number;
  ngOnInit(): void {
    this.getParams()

  }
  getParams() {
    this.itemId = +this._route.snapshot.paramMap.get('id');
    this.initForm()
  }
  override initForm(): void {
    this.formlyFields = [
      {
        key: 'nameEN',
        type: 'input',
        props: {
          label: this._languageService.getTransValue('lookups.nameEN'),
          required:true
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
          required:true
        },
        validators: {
          validation: ['arabicLetters'],
        }
      },
    ]
  }
  override onSubmit(): void {
    // (itemId?'users.updateMainItem':'users.addUser')
    throw new Error('Method not implemented.');
  }


}
