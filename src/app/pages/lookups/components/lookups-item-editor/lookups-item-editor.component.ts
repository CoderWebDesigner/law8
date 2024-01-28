import { CommonModule } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-lookups-item-editor',
  templateUrl: './lookups-item-editor.component.html',
  styleUrls: ['./lookups-item-editor.component.scss'],
  standalone: true,
  imports: [
    CommonModule,
    SharedModule,
    FormlyConfigModule
  ],
})
export class LookupsItemEditorComponent extends FormBaseClass implements OnInit {
  title: string;
  itemId: number;
  _dialogConfig = inject(DynamicDialogConfig)
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
        hide:this._dialogConfig.data['type']=='main',
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
