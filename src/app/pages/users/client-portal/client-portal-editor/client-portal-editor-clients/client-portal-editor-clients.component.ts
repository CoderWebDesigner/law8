import { Component, inject, Input, SimpleChanges } from '@angular/core';
import { CommonModule } from '@angular/common';
import { PickListModule } from 'primeng/picklist';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { finalize } from 'rxjs';

@Component({
  selector: 'app-client-portal-editor-clients',
  standalone: true,
  imports: [CommonModule,PickListModule,SharedModule],
  templateUrl: './client-portal-editor-clients.component.html',
  styleUrls: ['./client-portal-editor-clients.component.scss']
})
export class ClientPortalEditorClientsComponent {
  @Input() userId:string   
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  isSubmit: boolean;
  source: any[] = [];
  target: any[] = [];
  apiUrls=API_Config.matterClientSecurity; 
  ngOnChanges(changes: SimpleChanges): void {
    this.getList()
   if(this.userId) this.getByUser(); 
  }
 
  getList() {  
    console.log('getList');
    this._apiService   
      .get(this.apiUrls?.get)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.source = res['result'];
        },
      });
  }
  getByUser() {
    this._apiService
      .get(this.apiUrls?.getById, { userId: this.userId })
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.target = res['result'];
          this.source = this.source.filter(
            (sourceItem) =>
              !this.target.some((targetItem) => targetItem.id === sourceItem.id)
          );
        },
      });
  }
  submit() {
    console.log(this.userId)
    let model = {
      userId: this.userId,
      clientIds: this.target.map((item) => item.id),
    };
    this._apiService
      .post(this.apiUrls?.update, model)
      .pipe(
        this._sharedService.takeUntilDistroy(),
        finalize(() => this.isSubmit)
      )
      .subscribe({
        next: (res: ApiRes) => {
          const text = this._languageService.getTransValue(
            'messages.updateSuccessfully'
          );
          this._toastrNotifiService.displaySuccessMessage(text);
        },
      });
  }
}
