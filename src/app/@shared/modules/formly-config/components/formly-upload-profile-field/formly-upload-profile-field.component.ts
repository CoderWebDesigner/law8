import { FieldType, FieldTypeConfig } from '@ngx-formly/core';
import { Component, ChangeDetectorRef, inject } from '@angular/core';
import { ImageCroppedEvent } from 'ngx-image-cropper';
import { DialogService } from 'primeng/dynamicdialog';
import { ImageCropComponent } from './image-crop/image-crop.component';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-formly-upload-profile-field',
  templateUrl: './formly-upload-profile-field.component.html',
  styleUrls: ['./formly-upload-profile-field.component.scss'],
})
export class FormlyUploadProfileFieldComponent extends FieldType<FieldTypeConfig> {
  file: File;
  fileAsBase64: string;
  cdRef = inject(ChangeDetectorRef);
  _dialogService = inject(DialogService);
  _sharedService = inject(SharedService);

  onSelect(event) {
    console.log('onselect event', event);
    this.file = event.rejectedFiles[event.rejectedFiles.length - 1];
    this.readFileAsBase64(this.file);
    if (this.props['withCrop']) {
      this.onCropEditor();
    }else{
      this.formControl.setValue(this.file);
    }
  }
  onCropEditor() {
    const ref = this._dialogService.open(ImageCropComponent, {
      width: '40vw',
      data: this.file,
    });
    ref.onClose.pipe(this._sharedService.takeUntilDistroy()).subscribe({
      next: (res:string) => {
        if (res) {
          this.fileAsBase64=res
          this.formControl.setValue(this.base64ToFile(res));
          this.cdRef.detectChanges();
        }else{
          this.formControl.setValue(this.formControl?.value);
          this.cdRef.detectChanges();
        }
      },
    });
  }
  base64ToFile(base64: string): File {
    // Extract the base64 data (removing the metadata prefix)
    const arr = base64.split(',');
    const mime = arr[0].match(/:(.*?);/)?.[1] || '';
    const bstr = atob(arr[1]);
    let n = bstr.length;
    const u8arr = new Uint8Array(n);
  
    while (n--) {
      u8arr[n] = bstr.charCodeAt(n);
    }
  
    // Create and return the File object
    return new File([u8arr], this.file.name, { type: mime });
  }

  onRemove(event) {
    event.stopPropagation();
    this.file = null;
    this.fileAsBase64 = null;
    this.formControl.setValue('');
  }

  readFileAsBase64(file: File) {
    const reader = new FileReader();

    reader.onload = (e: any) => {
      this.fileAsBase64 = e.target.result;
      // this.formControl.setValue(this.fileAsBase64);
      this.cdRef.detectChanges();
    };

    reader.readAsDataURL(file);
  }

  ngOnInit(): void {
    this.fileAsBase64 = this.formControl?.value;
    // this.fileAsBase64 = this.formControl?.value?`data:image/jpg;base64,${this.formControl?.value}`:""

    // this.form.valueChanges.subscribe((res) => {
    //   this.fileAsBase64 = res[this.field.key as string];
    //   if (!res[this.field.key as string]) this.fileAsBase64 = '';
    // });
  }
  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    // this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl);
    // event.blob can be used to upload the cropped image
  }
}
