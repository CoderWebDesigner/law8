import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TranslateModule } from '@ngx-translate/core';
import { ButtonModule } from 'primeng/button';
import { SkeletonModule } from 'primeng/skeleton';
import {
  DialogService,
  DynamicDialogConfig,
  DynamicDialogModule,
  DynamicDialogRef,
} from 'primeng/dynamicdialog';
import { SharedActionsComponent } from './components/shared-actions/shared-actions.component';
import { LanguageBindPipe } from './pipes/lang-bind.pipe';
import { SuccessActionPopupComponent } from './components/success-action-popup/success-action-popup.component';
import { RouterModule } from '@angular/router';

const components: any = [
  SharedActionsComponent,
  LanguageBindPipe,
  SuccessActionPopupComponent,
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