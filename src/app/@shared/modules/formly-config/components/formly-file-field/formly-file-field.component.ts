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
    const addedFiles: File[] = event.addedFiles;
    this.files=addedFiles
    this.formControl.setValue(this.files)
    console.log('files',this.files)
    //this.files.push(...event.addedFiles);
    addedFiles.forEach(file => {
      this.readFileAsBase64(file);
    });
  }

  onRemove(event:any) {
    this.files.splice(this.files.indexOf(event), 1);
    this.filesBase64.splice(this.files.indexOf(event), 1);
    this.formControl.setValue(this.filesBase64);
  }

  ngOnInit(): void {
    this.formControl.valueChanges.subscribe((res) => {
      if(typeof res  ==='string'){
        console.log('onchange',res)

        let file = this.base64ToFile(res)
        this.files = [file]
        this.formControl.setValue(this.files)
        console.log('formControl', this.formControl.value)
        console.log('base64ToFile', this.base64ToFile(res))
      }
     
      // this.filesBase64 = res
      // console.log('filesBase64',this.filesBase64)
      // if(this.filesBase64?.length){
      //   this.filesBase64.forEach((file:IFile) =>{
      //     console.log('oninit')
      //     this.files.push(this.base64ToFile(file))
      //     this.cdRef.detectChanges();
      //   })
      // }

    });
  }

  private readFileAsBase64(file: File) {
    const reader = new FileReader();
    reader.onload = () => {
      const base64String = reader.result as string;
      console.log(base64String)
      // this.filesBase64.push({
      //   name: file.name,
      //   type: file.type,
      //   size: ''+file?.size,
      //   file: base64String,
      // });
      // this.updateFormControlValue();
      // this.cdRef.detectChanges();
    };
    reader.readAsDataURL(file);
  }

  // private updateFormControlValue() {
  //   console.log(this.files)
  //   this.formControl.setValue(this.files);
  // }

  base64ToFile(base64:string) {
    // Split the base64 string into header and data
    const parts = base64.split(';base64,');
    const base64String = parts[1]
    const fileType=parts[0].split('data:')[1]

    const data = window.atob(base64String);
    const array = new Uint8Array(data.length);
  
    // Convert data to array buffer
    for (let i = 0; i < data.length; ++i) {
      array[i] = data.charCodeAt(i);
    }
  
    // Create a blob
    const blob = new Blob([array], { type: fileType });
  
    // Create a file object
    const file = new File([blob], 'file', { type: fileType });
  
    return file;
    // const byteCharacters = atob(base64);
    // const byteNumbers = new Array(byteCharacters.length);
    // for (let i = 0; i < byteCharacters.length; i++) {
    //   byteNumbers[i] = byteCharacters.charCodeAt(i);
    // }
    // const byteArray = new Uint8Array(byteNumbers);
    // return new Blob([byteArray]);
  }


}
