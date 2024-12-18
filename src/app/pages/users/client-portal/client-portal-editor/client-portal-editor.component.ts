import { Component, OnInit } from '@angular/core';
import { CommonModule } from '@angular/common';
import { SharedModule } from '@shared/shared.module';
import { FormlyConfigModule } from '@shared/modules/formly-config/formly-config.module';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { FormBaseClass } from '@core/classes/form-base.class';
import { ClientPortalEditorClientsComponent } from './client-portal-editor-clients/client-portal-editor-clients.component';
import { TabViewModule } from 'primeng/tabview';

@Component({
  selector: 'app-client-portal-editor',
  standalone: true,
  imports: [CommonModule,SharedModule,FormlyConfigModule,SharedCardComponent,ClientPortalEditorClientsComponent,TabViewModule],
  templateUrl: './client-portal-editor.component.html',
  styleUrls: ['./client-portal-editor.component.scss']
})
export class ClientPortalEditorComponent extends FormBaseClass implements OnInit{
  clientId:any;
  items: any[] = [
    { label: this._languageService.getTransValue('Clients') },
  ];
  ngOnInit(): void {
    this.clientId = this._route.snapshot.paramMap.get('id');
   this.initForm()
  }
  override initForm(): void {
    this.formlyFields=[
      {
        fieldGroupClassName:'row',
        fieldGroup:[
          {
            key:'clientCode',
            type:'select',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('Client Code'),
              options:[]
            }
          },
          {
            key:'clientName',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('Client Name'),
            }
          },
          // {
          //   key:'clientGroup',
          //   type:'select',
          //   className:'col-md-4',
          //   props:{
          //     label:this._languageService.getTransValue('Client Group'),
          //     options:[]
          //   }
          // },
          {
            key:'userName',
            type:'input',
            className:'col-md-4',
            props:{
              label:this._languageService.getTransValue('User Name'),
            }
          },
          {
            type: 'password',
            key: 'password',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.password'),
            },
          },
          {
            type: 'phone',
            key: 'telNo',
            className: 'col-md-4',
            props: {
              type: 'number',
              label: this._languageService.getTransValue('users.telephone'),
            },
          },
          {
            type: 'phone',
            key: 'mobileNo',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.mobileNumber'),
            },
          },

          {
            type: 'input',
            key: 'email',
            className: 'col-md-4',
            props: {
              label: this._languageService.getTransValue('common.email'),
              required:true,
            },
            validators: {
              validation: ['email'],
            },
          },
        ]
      }
    ]
  }
  override onSubmit(): void {
    throw new Error('Method not implemented.');
  }

}
