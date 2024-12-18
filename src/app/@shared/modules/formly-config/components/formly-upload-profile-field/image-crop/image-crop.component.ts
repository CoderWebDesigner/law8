import { Component, inject, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ImageCroppedEvent, ImageCropperComponent } from 'ngx-image-cropper';
import { DynamicDialogConfig, DynamicDialogRef } from 'primeng/dynamicdialog';
import { ButtonModule } from 'primeng/button';
import { TranslateModule } from '@ngx-translate/core';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-image-crop',
  standalone: true,
  imports: [ImageCropperComponent,ButtonModule,TranslateModule],
  templateUrl: './image-crop.component.html',
  styleUrls: ['./image-crop.component.scss'],
})
export class ImageCropComponent implements OnInit {
  
  imageChangedEvent: Event | null = null;
  croppedImage: any;
  croppedFile:any;
  croppedBase64:any;
  fileName:string
  dynamicDialogConfig=inject(DynamicDialogConfig)
  dynamicDialogRef=inject(DynamicDialogRef);
  constructor( private sanitizer: DomSanitizer){}
  ngOnInit(): void {
    console.log(this.dynamicDialogConfig.data)
    this.fileName=this.dynamicDialogConfig.data.name
    this.convertFileToInputEvent(this.dynamicDialogConfig.data)
  }
  convertFileToInputEvent(file:File){
    const dataTransfer = new DataTransfer();
    dataTransfer.items.add(file)

    // Manually construct the Event
    const inputEvent = new Event('change', {
      bubbles: true,
      cancelable: true,
    }) as InputEvent;

    // Assign the `files` to the `target` property
    Object.defineProperty(inputEvent, 'target', {
      writable: true,
      value: {
        files: dataTransfer.files,
      },
    });
    this.imageChangedEvent=inputEvent
  }

  imageCropped(event: ImageCroppedEvent) {
    console.log(event);
    this.croppedBase64=event.base64
  
    this.croppedImage = this.sanitizer.bypassSecurityTrustUrl(event.objectUrl || event.base64 || '');
    // event.blob can be used to upload the cropped image
  }
 
  
}
