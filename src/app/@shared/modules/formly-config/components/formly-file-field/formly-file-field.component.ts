import { Component } from '@angular/core';
import { FieldType, FieldTypeConfig } from '@ngx-formly/core';

@Component({
  selector: 'app-formly-file-field',
  templateUrl:'./formly-file-field.component.html',
  styleUrls: ['./formly-file-field.component.scss'],
})
export class FormlyFileFieldComponent extends FieldType<FieldTypeConfig> {
  files: File[] = [];

  onSelect(event) {
    this.files.push(...event.addedFiles);
    this.formControl.setValue(this.files)
  }

  onRemove(event) {
    this.files.splice(this.files.indexOf(event), 1);
    this.formControl.setValue(this.files)
  }

  ngOnInit(): void {
    //Called after the constructor, initializing input properties, and the first call to ngOnChanges.
    //Add 'implements OnInit' to the class.
    this.form.valueChanges.subscribe(res =>{
      this.files = res[this.field.key as string]
      if(!res[this.field.key as string]) this.files = []

    })
  }
}
