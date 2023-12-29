import { TranslateService } from '@ngx-translate/core';
import { Component, OnInit, inject } from '@angular/core';
import { FieldArrayType, FieldType } from '@ngx-formly/core';
import { FormlyService } from '../../services/formly.service';

@Component({
  selector: 'app-formly-table-field',
  templateUrl: './formly-table-field.component.html',
  styleUrls: ['./formly-table-field.component.scss'],
})
export class FormlyTableFieldComponent extends FieldArrayType implements OnInit {
  _translateService = inject(TranslateService);
  _formlyService = inject(FormlyService)
  columns;
  selectedRows!: any[];
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
    this.columns = this.getColumns(this.props['columns']);
    this._formlyService.addRow$.subscribe({
      next: (res) => {
        if (res) this.add()
      }
    })
    this._formlyService.removeRow$.subscribe({
      next: (res) => {
        this.remove(res)
      }
    })
  }
  onRowSelect(event: any) {
    this.formControl.setValue(this.selectedRows)
    console.log(this.selectedRows)
  }
}
