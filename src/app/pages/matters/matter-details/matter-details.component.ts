import { Component, OnInit, inject } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { LanguageService } from '@core/services';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-matter-details',
  templateUrl: './matter-details.component.html',
  styleUrls: ['./matter-details.component.scss']
})
export class MatterDetailsComponent implements OnInit {
  _route = inject(ActivatedRoute)
  _languageService = inject(LanguageService)
  matter: any;
  showFields: boolean = false;
  items: MenuItem[] = [
    { label: this._languageService.getTransValue('common.parties') },
    { label: this._languageService.getTransValue('common.general') },
    { label: this._languageService.getTransValue('common.address') },
    { label: this._languageService.getTransValue('common.contacts') },
    { label: this._languageService.getTransValue('matters.activities') },
    { label: this._languageService.getTransValue('matters.invoices') },
    { label: this._languageService.getTransValue('matters.timesheet') },
    { label: this._languageService.getTransValue('common.relatedMatters') },
    // { label: this._languageService.getTransValue('matters.remarks') },
    { label: this._languageService.getTransValue('matters.documents') },
    // { label: this._languageService.getTransValue('matters.status') },
    { label: this._languageService.getTransValue('matters.billingSettings') }
  ];
  ngOnInit(): void {
    this.getParams()
  }
  getParams() {
    this._route.params.pipe().subscribe({
      next: res => {
        console.log(res)
      }
    })
  }

  onToggleFields() {
    this.showFields = !this.showFields
  }
}
