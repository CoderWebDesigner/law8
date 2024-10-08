import {
  Component,
  OnInit,
  Output,
  EventEmitter,
  Inject,
  inject,
} from '@angular/core';
import { DOCUMENT } from '@angular/common';
import { DialogService } from 'primeng/dynamicdialog';
import { AppSearchComponent } from './app-search/app-search.component';
import { MenuItem } from 'primeng/api';

@Component({
  selector: 'app-topbar',
  templateUrl: './topbar.component.html',
  styleUrls: ['./topbar.component.scss'],
})

/**
 * Topbar component
 */
export class TopbarComponent implements OnInit {
  element: any;
  _dialogService = inject(DialogService);
  items: any[] | undefined;

  constructor(@Inject(DOCUMENT) private document: any) {}
  showInput = false;

  toggleInput() {
    this.showInput = !this.showInput;
  }

  openMobileMenu!: boolean;

  @Output() mobileMenuButtonClicked = new EventEmitter();

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
      !document.fullscreenElement &&
      !this.element.mozFullScreenElement &&
      !this.element.webkitFullscreenElement
    ) {
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
  onSearch(event){
    // let searchText = 
    console.log(event)
  }
  getData() {
    this.items = [];
  }
  // openSearchModel(){
  //   this._dialogService.open(AppSearchComponent,{
  //     width:'40vw',
  //   })
  // }
}
