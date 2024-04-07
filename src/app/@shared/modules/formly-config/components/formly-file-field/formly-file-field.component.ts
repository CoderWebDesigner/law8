import { ChangeDetectorRef, Component, Inject, OnInit } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

interface IFile {
  name: string;
  type: string;
  file: string;
  size: string;
}

@Component({
  selector: 'app-formly-file-field',
  templateUrl: './formly-file-field.component.html',
  styleUrls: ['./formly-file-field.component.scss'],
})
export class FormlyFileFieldComponent
  extends FieldType<FieldTypeConfig>
  implements OnInit
{
  files: File[] = [];
  filesBase64: IFile[] = [];

  constructor(private cdRef: ChangeDetectorRef) {
    super();
  }

  onSelect(event: any) {
    // const addedFiles: File[] = event.addedFiles;
    this.files = event.addedFiles;
    console.log(this.files);
    this.formControl.setValue(this.files);
    
    //this.files.push(...event.addedFiles);
    this.files.forEach((file) => {
      
      this.readFileAsBase64(file);
    });
  }

  onRemove(event: any) {
    this.files.splice(this.files.indexOf(event), 1);
    // this.filesBase64.splice(this.files.indexOf(event), 1);
    this.formControl.setValue(this.files);
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((res) => {
      console.log(res);
      this.files.push(this.base64ToFile(res));
      this.cdRef.detectChanges();
      // this.filesBase64 = res;
      // if (this.filesBase64?.length) {
      //   this.filesBase64.forEach((file: IFile) => {
      //     this.files = [this.base64ToFile(file)];
      //     this.files.push(this.base64ToFile(file))
      //     this.cdRef.detectChanges();
      //   });
      // }
    });
  }

  private readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;

      this.filesBase64.push({
        name: file.name,
        type: file.type,
        size: '' + file?.size,
        file: base64String,
      });
      // this.updateFormControlValue();
      this.cdRef.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  private updateFormControlValue() {
    this.formControl.setValue(this.filesBase64);
  }

  base64ToFile(f: IFile) {
    // Split the base64 string into header and data
    const parts = f.file.split(';base64,');
    const header = parts[0];
    const data = window.atob(parts[1]);
    const array = new Uint8Array(data.length);

    // Convert data to array buffer
    for (let i = 0; i < data.length; ++i) {
      array[i] = data.charCodeAt(i);
    }

    // Create a blob
    const blob = new Blob([array], { type: f?.type });

    // Create a file object
    const file = new File([blob], f?.name, { type: f?.type });

    return file;
  }
}
