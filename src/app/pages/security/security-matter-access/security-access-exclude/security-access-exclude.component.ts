import { Component, Input, OnChanges, SimpleChanges, inject } from '@angular/core';
import { CommonModule } from '@angular/common';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { AccordionModule } from 'primeng/accordion';
import { DropdownModule } from 'primeng/dropdown';
import { PickListModule } from 'primeng/picklist';

import { SecurityMatterAccessClientsComponent } from '../security-matter-access-clients/security-matter-access-clients.component';
import { SecurityMatterAccessJurisdictionComponent } from '../security-matter-access-jurisdiction/security-matter-access-jurisdiction.component';
import { SecurityMatterAccessResponsableLawyersComponent } from '../security-matter-access-responsable-lawyers/security-matter-access-responsable-lawyers.component';
import { SharedModule } from '@shared/shared.module';
import { finalize } from 'rxjs';


@Component({
  selector: 'app-security-access-exclude',
  standalone: true,
  imports: [
    CommonModule,
    SharedCardComponent,
    SharedTableComponent,
    DropdownModule,
    SharedModule,
    SharedSearchInputComponent,
    PickListModule,
    SecurityMatterAccessClientsComponent,
    SecurityMatterAccessResponsableLawyersComponent,
    SecurityMatterAccessJurisdictionComponent,
    AccordionModule,
  ],  templateUrl: './security-access-exclude.component.html',
  styleUrls: ['./security-access-exclude.component.scss']
})
export class SecurityAccessExcludeComponent implements OnChanges {
  @Input() userId: string;
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  isSubmit: boolean;
  source: any[] = [];
  target: any[] = [];
  
  apiUrls = API_Config.MatterExcludeSecurity;

  ngOnChanges(changes: SimpleChanges): void {
    
    if (this.userId){
      this.getList();
      this.getByUser();
    } 
  }

  getList() {
    console.log('getList');
    this._apiService
      .get(this.apiUrls?.get+this.userId)
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
    console.log(this.userId);
    let model = {
      userId: this.userId,
      ids: this.target.map((item) => item.id),
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
