import { Component, OnInit, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { FormBaseClass } from '@core/classes/form-base.class';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';

@Component({
  selector: 'app-lookups-sub-item-editor',
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule
  ],
  templateUrl: './lookups-sub-item-editor.component.html',
  styleUrls: ['./lookups-sub-item-editor.component.scss']
})
export class LookupsSubItemEditorComponent  extends FormBaseClass implements OnInit {
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
        key:'mainItem',
        type:'select',
        props:{
          required:true,
          label:this._languageService.getTransValue('lookups.mainCategory')
        }
      },
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
