import { CommonModule } from '@angular/common';
import { Component, OnInit } from '@angular/core';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
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
        type: 'input',
        key: 'Appeal Period',
        className: 'col-md-4',
        props: {
          type:'number',
          label: this._languageService.getTransValue('lookups.appealPeriod'),
        },
      },
      {
        type: 'input',
        key: 'Cassation Period',
        className: 'col-md-4',
        props: {
          type:'number',
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
    ]
  }
  override onSubmit(): void {
    // (itemId?'users.updateMainItem':'users.addUser')
    throw new Error('Method not implemented.');
  }

}
