import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Component, ChangeDetectorRef, inject } from '@angular/core';

@Component({
  selector: 'app-formly-upload-profile-field',
  templateUrl: './formly-upload-profile-field.component.html',
  styleUrls: ['./formly-upload-profile-field.component.scss'],
})
export class FormlyUploadProfileFieldComponent extends FieldType<FieldTypeConfig> {
  file: File;
  fileAsBase64: string;
  cdRef = inject(ChangeDetectorRef);

  onSelect(event) {
    this.file = event.rejectedFiles[event.rejectedFiles.length - 1];
    this.readFileAsBase64(this.file);
  }

  onRemove(event) {
    event.stopPropagation();

    this.file = null;
    this.fileAsBase64 = null;
    this.formControl.setValue(null);
  }

  readFileAsBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.fileAsBase64 = e.target.result;
      this.formControl.setValue(this.fileAsBase64);
      this.cdRef.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.fileAsBase64 = this.formControl?.value
    // this.form.valueChanges.subscribe((res) => {
    //   this.fileAsBase64 = res[this.field.key as string];
    //   if (!res[this.field.key as string]) this.fileAsBase64 = '';
    // });
  }

}
