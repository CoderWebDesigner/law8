import { Component, OnInit, Output, EventEmitter, Inject, inject } from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { AuthService, LanguageService } from '@core/services';
import { DialogService } from 'primeng/dynamicdialog';
import { SuccessActionPopupComponent } from '@shared/components/success-action-popup/success-action-popup.component';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  @Output() mobileMenuButtonClicked = new EventEmitter();

  element: any;
  openMobileMenu!: boolean;

  _authService = inject(AuthService);

  defaultOrg: string;

  constructor(@Inject(DOCUMENT) private document: any) { }

  ngOnInit() {
    this.openMobileMenu = false;
    this.element = document.documentElement;

  }


  /**
   * Toggle the menu bar when having mobile screen
   */
  toggleMobileMenu(event: any) {
    event.preventDefault();
    this.mobileMenuButtonClicked.emit();
  }
  /**
   * Fullscreen method
   */
  fullscreen() {
    document.body.classList.toggle('fullscreen-enable');
    if (
      !document.fullscreenElement && !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement) {
      if (this.element.requestFullscreen) {
        this.element.requestFullscreen();
      } else if (this.element.mozRequestFullScreen) {
        /* Firefox */
        this.element.mozRequestFullScreen();
      } else if (this.element.webkitRequestFullscreen) {
        /* Chrome, Safari and Opera */
        this.element.webkitRequestFullscreen();
      } else if (this.element.msRequestFullscreen) {
        /* IE/Edge */
        this.element.msRequestFullscreen();
      }
    } else {
      if (this.document.exitFullscreen) {
        this.document.exitFullscreen();
      } else if (this.document.mozCancelFullScreen) {
        /* Firefox */
        this.document.mozCancelFullScreen();
      } else if (this.document.webkitExitFullscreen) {
        /* Chrome, Safari and Opera */
        this.document.webkitExitFullscreen();
      } else if (this.document.msExitFullscreen) {
        /* IE/Edge */
        this.document.msExitFullscreen();
      }
    }
  }
}
