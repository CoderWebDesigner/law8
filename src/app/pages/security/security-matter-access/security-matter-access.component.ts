import { ChangeDetectorRef, Component, OnInit, inject } from '@angular/core';

import { SharedCardComponent } from '@shared/components/shared-card/shared-card.component';
import { SharedTableComponent } from '@shared/components/shared-table/shared-table.component';
import { DropdownModule } from 'primeng/dropdown';
import { SharedSearchInputComponent } from '@shared/components/shared-search-input/shared-search-input.component';
import { SharedModule } from '@shared/shared.module';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { LanguageService, ToasterService } from '@core/services';
import { SharedService } from '@shared/services/shared.service';
import { PickListModule } from 'primeng/picklist';
import { AccordionModule } from 'primeng/accordion';
import { SecurityMatterAccessClientsComponent } from './security-matter-access-clients/security-matter-access-clients.component';
import { SecurityMatterAccessResponsableLawyersComponent } from './security-matter-access-responsable-lawyers/security-matter-access-responsable-lawyers.component';
import { SecurityMatterAccessJurisdictionComponent } from './security-matter-access-jurisdiction/security-matter-access-jurisdiction.component';
import { SecurityMatterIncludeComponent } from './security-matter-include/security-matter-include.component';
import { SecurityAccessExcludeComponent } from './security-access-exclude/security-access-exclude.component';

@Component({
  selector: 'app-security-matter-access',
  standalone: true,
  imports: [
    SharedCardComponent,
    SharedTableComponent,
    DropdownModule,
    SharedModule,
    SharedSearchInputComponent,
    PickListModule,
    SecurityMatterAccessClientsComponent,
    SecurityMatterAccessResponsableLawyersComponent,
    SecurityMatterAccessJurisdictionComponent,
    SecurityMatterIncludeComponent,
    AccordionModule,
    SecurityAccessExcludeComponent
],
  templateUrl: './security-matter-access.component.html',
  styleUrls: ['./security-matter-access.component.scss'],
})
export class SecurityMatterAccessComponent implements OnInit {
  _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _languageService = inject(LanguageService);
  userId: string;
  users: any[] = [];

  ngOnInit(): void {
    this.getLookupsData();

  }
  getLookupsData() {
    this._apiService
      .get(API_Config.general.getUsersLookup)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          this.users = res['result'];
        },
      });
  }
  selectUser(e) {
    this.userId = e?.value;
  }
}
