import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, inject } from '@angular/core';
import { FieldArrayType, FieldType } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-table-field',
  templateUrl: './formly-table-field.component.html',
  styleUrls: ['./formly-table-field.component.scss'],
})
export class FormlyTableFieldComponent extends FieldType {
  _translateService = inject(TranslateService);
  columns;

  ngOnInit(): void {
    this.initTable();
  }

  private getColumns(columnsLocalized) {
    switch (this._translateService.currentLang) {
      case 'en':
        return columnsLocalized?.en ? columnsLocalized.en : columnsLocalized;
      default:
        return columnsLocalized?.ar ? columnsLocalized.ar : columnsLocalized;
    }
  }

  initTable() {
    this.columns = this.getColumns(this.props['columnsLocalized']);
  }
}
