import { Component, OnDestroy, inject } from '@angular/core';
import { FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { ApiService } from '@core/api/api.service';
import { AuthService, LanguageService, ToasterService } from '@core/services';
import { FormlyFieldConfig, FormlyFormOptions } from '@ngx-formly/core';
import { SharedTableService } from '@shared/components/shared-table/services/table.service';
import { SharedService } from '@shared/services/shared.service';
import {DialogService,DynamicDialogConfig,DynamicDialogRef} from 'primeng/dynamicdialog';
import { Subject, finalize, takeUntil } from 'rxjs';
@Component({
  template: '',
})
export abstract class FormBaseClass implements OnDestroy {
  private unsubscribeAll: Subject<boolean>;

  isLoading: boolean = false;
  isSubmit: boolean = false;
  formly: FormGroup = new FormGroup({});
  formlyModel: any = {};
  formlyFields: FormlyFieldConfig[] = [];
  formlyOption: FormlyFormOptions = {};


  lookupsData: any = [];

  _languageService = inject(LanguageService);
  _toastrNotifiService = inject(ToasterService);
  _DialogService = inject(DialogService);
  _dynamicDialogConfig = inject(DynamicDialogConfig);
  _dynamicDialogRef = inject(DynamicDialogRef);
  _apiService = inject(ApiService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _authService = inject(AuthService);
  _sharedService = inject(SharedService);
  _sharedTableService = inject(SharedTableService);

  //init Form
  abstract initForm(): void;

  //get lookup data
  getLookupsData(): void {}

  //get data by id
  getData(): void {}

  //on submit form
  abstract onSubmit(): void;

  protected takeUntilDestroy = () => {
    if (!this.unsubscribeAll) this.unsubscribeAll = new Subject<boolean>();
    return takeUntil(this.unsubscribeAll);
  };

  //used after leaving the component
  ngOnDestroy(): void {
    if (this.unsubscribeAll) {
      this.unsubscribeAll.next(true);
      this.unsubscribeAll.complete();
    }
  }
}
