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
    console.log(this.field)
    console.log(this.model)
  }
  onRowSelect(event: any) {
    // this.selectedRows.push(this.model[event.key])
    // get model(): any;
    // get form(): FormGroup | import("@angular/forms").FormArray;
    // get options(): import("../models").FormlyFormOptions;
    // get key(): string | number | (string | number)[];
    // get formControl(): NonNullable<F["formControl"]>;
    // get props(): NonNullable<F["props"]>;
    // get showError(): boolean;
    // get id(): string;
    // get formState(): any;
    // console.log(event)
    // console.log(this.model)
    // console.log(this.form)
    // console.log(this.options)
    // console.log(this.key)
    // console.log(this.formControl)
    // console.log(this.props)
    // console.log(this.showError)
    // console.log(this.id)
    // console.log(this.formState)
    this.selectedRows.push({...this.form.value['data']})
    console.log(this.selectedRows)
    // this.formControl.setValue(this.selectedRows)
  }
  getSort(e){
    console.log(e)
    this.model.sort((a,b)=>{ return e.order})
    console.log(this.model)
  }
  sortRepeatedSection(): void {
    // Fetch sorting criteria from your specific input fields
    const sortField = 'column1'; // Replace with the actual sorting field
    const sortOrder = 1; // Replace with the actual sorting order (1 for ascending, -1 for descending)

    // Set sorting criteria in the service
    // this.sortingService.setSorting(sortField, sortOrder);

    // Perform sorting logic for the repeated section
    this.field[0].fieldArray.fieldGroup.sort((a, b) => {
      // Adjust the sorting logic based on your requirements
      if (a.templateOptions.label < b.templateOptions.label) {
        return sortOrder;
      } else if (a.templateOptions.label > b.templateOptions.label) {
        return -sortOrder;
      } else {
        return 0;
      }
    });
  }
}
