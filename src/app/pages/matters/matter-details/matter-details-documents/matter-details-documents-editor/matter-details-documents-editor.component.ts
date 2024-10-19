import { DatePipe } from '@angular/common';
import { Component, OnInit, inject } from '@angular/core';
import { API_Config } from '@core/api/api-config/api.config';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ApiRes } from '@core/models';
import { GLOBAL_DATE_TIME_Without_Seconds_FORMATE } from '@core/utilities/defines';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedModule } from '@shared/shared.module';
import { DynamicDialogConfig } from 'primeng/dynamicdialog';

@Component({
  selector: 'app-matter-details-documents-editor',
  templateUrl: './matter-details-documents-editor.component.html',
  styleUrls: ['./matter-details-documents-editor.component.scss'],
  standalone: true,
  imports: [FormlyConfigModule, SharedModule],
  providers: [DatePipe],
})
export class MatterDetailsDocumentsEditorComponent
  extends FormBaseClass
  implements OnInit
{
  apiUrls = API_Config.matterDocuments;
  _config = inject(DynamicDialogConfig);
  _datePipe = inject(DatePipe);
  ngOnInit(): void {
    this.initForm();
    if (this._dynamicDialogConfig?.data?.rowData) this.getData();
  }
  override getData(): void {
    let id = this._dynamicDialogConfig?.data?.rowData?.id;
    this._apiService
      .get(`${this.apiUrls.getById}?id=${id}&LoadFile=true`)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          console.log(res);
          this.formlyModel = { 
            ...res['result'],
            // receivedDate:this._datePipe.transform(res['result'].receivedDate,GLOBAL_DATE_TIME_Without_Seconds_FORMATE),
            // documentDate:this._datePipe.transform(res['result'].documentDate,GLOBAL_DATE_TIME_Without_Seconds_FORMATE),
            // expirationDate:this._datePipe.transform(res['result'].expirationDate,GLOBAL_DATE_TIME_Without_Seconds_FORMATE),
            attachment: res['result'].applicationType + res['result'].logoFile
           };

          // this.formlyModel.startDate = this._datePipe.transform(
          //   this.formlyModel?.startDate,
          //   GLOBAL_DATE_TIME_Without_Seconds_FORMATE
          // );
          // this.formlyModel.attachment =
          //   res['result'].applicationType + res['result'].logoFile;

          console.log('formlyModel', this.formlyModel);
        },
      });
  }
  override initForm(): void {
    this.formlyFields = [
      {
        fieldGroupClassName: 'row',
        fieldGroup: [
          {
            className: 'col-12',
            key: 'attachment',
            type: 'file',
            props: {
              label: this._languageService.getTransValue('matters.document'),
              // required: true,
            },
          },
          {
            className: 'col-12',
            key: 'description',
            type: 'textarea',
            props: {
              label: this._languageService.getTransValue('common.description'),
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'receivedDate',
            type: 'date',
            defaultValue:new Date(),
            props: {
              label: this._languageService.getTransValue(
                'matters.receivedDate'
              ),
              //  formate:''
              required: true,
            },
          },
          {
            className: 'col-md-6',
            key: 'documentDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue(
                'matters.documentDate'
              ),
            },
          },
          {
            className: 'col-md-6',
            key: 'expirationDate',
            type: 'date',
            props: {
              label: this._languageService.getTransValue(
                'matters.expirationDate'
              ),
            },
          },
        ],
      },
    ];
  }
  save() {
    delete this.formlyModel.fileName;
    delete this.formlyModel.filePathe;
    delete this.formlyModel.logoFile;
    delete this.formlyModel.applicationType;
    const successMsgKey = this._dynamicDialogConfig?.data?.rowData
      ? 'messages.updateSuccessfully'
      : 'messages.createdSuccessfully';
    const formattedDate = this._datePipe.transform(
      this.formlyModel.documentDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );
    // const expirationDate = this._datePipe.transform(
    //   this.formlyModel.expirationDate,
    //   'yyyy-MM-ddTHH:mm:ss.SSSZ'
    // );
    if (this.formlyModel.expirationDate) {
      const expirationDate = this._datePipe.transform(
          this.formlyModel.expirationDate,
          'yyyy-MM-ddTHH:mm:ss.SSSZ'
      );
      this.formlyModel.expirationDate = expirationDate;
  }
    const ReceivedDate = this._datePipe.transform(
      this.formlyModel.receivedDate,
      'yyyy-MM-ddTHH:mm:ss.SSSZ'
    );

    this.formlyModel.documentDate = formattedDate;
    // this.formlyModel.expirationDate = expirationDate;
    this.formlyModel.receivedDate = ReceivedDate;

    const requestPayload = this._dynamicDialogConfig?.data?.rowData
      ? {
          ...this.formlyModel,

          id: this._dynamicDialogConfig?.data?.rowData?.id,
        }
      : {
          ...this.formlyModel,

          Law_MatterId: this._dynamicDialogConfig?.data?.law_MatterId,
        };
    console.log(requestPayload);
    let formData = new FormData();
    for (const [key, value] of Object.entries(requestPayload)) {
      formData.append(key, `${value}`);
    }
    formData.append('attachment', this.formlyModel.attachment[0]);
    const path = this._dynamicDialogConfig?.data?.rowData
      ? this.apiUrls.update
      : this.apiUrls.create;
    this._apiService
      .post(path, formData)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            const text = this._languageService.getTransValue(successMsgKey);
            this._toastrNotifiService.displaySuccessMessage(text);
            this._DialogService.dialogComponentRefMap.forEach((dialog) => {
              this._dynamicDialogRef.close(dialog);
            });
          } else {
            this._toastrNotifiService.displayErrorToastr(res?.message);
          }
        },
        error: (err: any) => {
          this._toastrNotifiService.displayErrorToastr(err?.error?.message);
        },
      });
  }
  override onSubmit(): void {
    if (this.formly.invalid) return;
    if (this._dynamicDialogConfig?.data?.isDynamic) {
      this.save();
    }
  }
}
