import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';
import { Timesheet_Editor_Columns_AR, Timesheet_Editor_Columns_EN, Timesheet_Editor_Columns_FR } from './timesheet-editor-columns.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { FormlyService } from '@shared/modules/formly-config/services/formly.service';
import { TimeSheet } from '@core/models';
import { MattersComponent } from '../matters/matters.component';
import { FormlyFieldConfig } from '@ngx-formly/core';
import { TimesheetService } from '@shared/services/timesheet.service';

@Component({
  selector: 'app-timesheet-editor',
  templateUrl: './timesheet-editor.component.html',
  styleUrls: ['./timesheet-editor.component.scss']
})
export class TimesheetEditorComponent extends FormBaseClass implements OnInit {
  _formlyService = inject(FormlyService)
  _timeSheetService = inject(TimesheetService)
  cdRef = inject(ChangeDetectorRef);
  placeholderObject = new TimeSheet(new Date())
  selectedIndex!: string;
  selectedMatter: any;
  incrementValue:number=0.1
  columnsLocalized = {
    ar: Timesheet_Editor_Columns_AR,
    en: Timesheet_Editor_Columns_EN,
    fr: Timesheet_Editor_Columns_FR,
  }
  data: any[] = []
  ngOnInit(): void {
    this.initForm()

  }
  override initForm(): void {
    if (this.data.length == 0) this.addNewRow()
    this.formlyModel = { data: this.data }
    this.formlyFields = [
      {
        className: 'col-md-12',
        key: 'data',
        type: 'table',
        props: {
          columns: this.columnsLocalized,
          withPaginator: true,
          rows: 10
        },
        fieldArray: {
          fieldGroup: [

            {
              key: 'Timer',
              type: 'timer',
              props: {
                required: true,
                stop:false,
                onPlay:(field)=>{
                  console.log(field.parent)
                  // console.log(field.parent.fieldGroup)
                  for(let i =0;i<field.parent.fieldGroup.length;i++){
                    if(i!=field.parent.key) field.parent.fieldGroup[i].props['stop'] = true
                  }
                  // console.log(field.parent.fieldGroup)
                  // // field.parent.fieldGroup?.foreach((obj,index)=>{
                  // //   if(index!=field.parent.key) obj.props['stop'] = true
                  // // })
                  // // this.selectedIndex = field.parent.key
                  // // console.log(this.selectedIndex)
                }
              },
            },
            {
              key: 'Date',
              type: 'date',
              className: 'd-block',
              props: {
                required: true,
              }
            },
            {
              key: 'Matter',
              type: 'select',
              className: 'd-block',
              props: {
                required: true,
                options: [
                  { label: '00000-001', value: '00000-001' },
                  { label: '00000-002', value: '00000-002' },
                  { label: 'All Matters', value: 'All Matters' },
                ],
                onChange: (e, field) => {
                  if (e.value == 'All Matters') {
                    this._DialogService.open(MattersComponent, {
                      width: '70%'
                    })
                  }
                  this.addNewRow()
                },
                onClick: (field) => {
                  this.selectedIndex = field.parent.key
                }
              },
            },
            {
              key: 'ClientName',
              type: 'input',
              props: {
                readonly: true,
              }
            },
            {
              key: 'Lawyer',
              type: 'select',

              props: {
                required: true,
                options: [
                  { label: 'Lawyer 1', value: 'Lawyer 1' },
                  { label: 'Lawyer 2', value: 'Lawyer 1' },
                  { label: 'Ahmad Awad', value: 'Ahmad Awad' },
                ]
              }
            },
            {
              key: 'Task',
              type: 'select',
              props: {
                required: true,
                options: [
                  { label: 'Billable', value: 'Billable' },
                  { label: 'Non-Billable', value: 'Non-Billable' },
                  { label: 'No-Charge', value: 'No-Charge' },
                ]
              }
            },
            {
              key: 'Hours',
              type: 'input',
              props: {
                type: 'number',
                step: 0.1,
                required: true,
              },
              hooks: {
                onInit: (field: FormlyFieldConfig) => {
                  field.form.get('Timer').valueChanges.subscribe({
                    next: seconds => {
                      field.formControl.setValue(this.calculateValueInSeconds(seconds))
                    }
                  })
                }
              },
            },
            {
              key: 'Rate',
              type: 'input',
              props: {
                type: 'number',
                required: true
              }
            },
            {
              key: 'Amount',
              type: 'input',
              props: {
                readonly: true,
              }
            },
            {
              key: 'Explanation',
              type: 'textarea',
              props: {
                rows: 1,
                required: true,
                input: (e) => {
                  this.addNewRow()
                }
              },

            },
            {
              key: 'Notes',
              type: 'textarea',
              props: {
                rows: 1
              }
            },
            {
              key: 'actions',
              fieldGroup: [
                {
                  type: 'button',
                  props: {
                    iconOnly: true,
                    class: 'text-danger bg-transparent border-0 p-2',
                    icon: 'pi pi-trash',
                    onClick: (field) => {
                      this._formlyService.removeRow$.next(field.parent.parent.index)
                    }
                  }
                }
              ]
            }

          ]
        }
      }
    ]

    this._timeSheetService.selectedMatter$.subscribe({
      next: res => {
        this.selectedMatter = res
        console.log(this._authService.user.UserName)
        console.log(this.selectedIndex)
        console.log(this.selectedMatter)
        this.data[this.selectedIndex] = {
          ...this.formlyModel.data[this.selectedIndex],
          ClientName: this.selectedMatter.ClientName,
          Matter:this.selectedMatter.Code,
          Laywer: this._authService.user.UserName,
          Task:'Billable',
          stop:true
         }
         this.formlyModel= {data:this.data}
        console.log(this.formlyModel)
      }
    })
  }
  override onSubmit(): void {
    console.log(this.formlyModel)
  }
  addNewRow() {
    if (!this.data.some(obj => obj.Explanation == "" && obj.Matter == "")) this.data.push({ ...this.placeholderObject })
    this.formlyModel = { data: this.data }
    console.log(this.data)
  }
  calculateValueInSeconds(seconds) {
    // Convert seconds to hours
    const min = seconds / 60;

    // Calculate the value for every 6 minutes
    // var valueIncrement = 0.1;
    console.log(min%2==0)
    if(min%2==0){
      this.incrementValue+=0.1
    }

    return this.incrementValue;
  }
}
