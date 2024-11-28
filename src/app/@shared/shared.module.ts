import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SharedActionsComponent } from './components/shared-actions/shared-actions.component';
import { LanguageBindPipe } from './pipes/lang-bind.pipe';
import { SuccessActionPopupComponent } from './components/success-action-popup/success-action-popup.component';
import { RouterModule } from '@angular/router';
import { SharedNoDataComponent } from './components/shared-no-data/shared-no-data.component';
import { MoreInfoComponent } from './components/shared-table/components/more-info/more-info.component';
import { EventsFilterPipe } from './pipes/events-filter.pipe';
import { SecondsToTimePipe } from './pipes/secondsToTime/seconds-to-time.pipe';
import { PermissionDirective } from '@core/directives/permission.directive';
import { SharedLoaderComponent } from './components/shared-loader/shared-loader.component';

const components: any = [
  SharedActionsComponent,
  LanguageBindPipe,
  SuccessActionPopupComponent,
  SharedNoDataComponent,
  MoreInfoComponent,
  EventsFilterPipe,
  SecondsToTimePipe,
  PermissionDirective,
  SharedLoaderComponent
];

// const components: any = [];

const modules = [TranslateModule, ButtonModule, SkeletonModule, RouterModule];

@NgModule({
  declarations: [...components],
  imports: [CommonModule, ...modules],
  exports: [...components, ...modules],
  providers: [
    DialogService,
    DynamicDialogConfig,
    DynamicDialogRef,
    LanguageBindPipe,
  ],
})
export class SharedModule {}
