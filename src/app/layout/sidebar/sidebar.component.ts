import { Component, OnInit, AfterViewInit, ElementRef, ViewChild, Input, OnChanges, inject } from '@angular/core';
import { Router, NavigationEnd } from '@angular/router';


import { MENU } from './menu';
import { MenuItem } from './menu.model';
import MetisMenu from 'metismenujs';
import { AuthService } from '@core/services';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
  styleUrls: ['./sidebar.component.scss']
})

/**
 * Sidebar component
 */
export class SidebarComponent implements OnInit, AfterViewInit, OnChanges {
  @ViewChild('componentRef') scrollRef:any;
  @ViewChild('sideMenu') sideMenu: ElementRef | undefined;

  @Input() isCondensed = false;
  menu: any;
  data: any;
  menuItems:any[] = [];

   _authService = inject(AuthService);

   parentRoute:string;
   isHovered:boolean = false;
  constructor( private router: Router) {
    router.events.forEach((event) => {
      if (event instanceof NavigationEnd) {
        this._activateMenuDropdown();
        this._scrollElement();
      }
    });
  }

  ngOnInit() {
    this.initialize();
    this._scrollElement();
  }

  ngAfterViewInit() {
    this.menu = new MetisMenu(this.sideMenu?.nativeElement);
    this._activateMenuDropdown();
  }

  toggleMenu(event) {
    event.currentTarget.nextElementSibling.classList.toggle('mm-show');
  }

  ngOnChanges() {
    if (!this.isCondensed && this.sideMenu || this.isCondensed) {
      setTimeout(() => {
        this.menu = new MetisMenu(this.sideMenu?.nativeElement);
      });
    } else if (this.menu) {
      this.menu.dispose();
    }
  }
  _scrollElement() {
    setTimeout(() => {
      if (document.getElementsByClassName("mm-active").length > 0) {
        const currentPosition:any = document.getElementsByClassName("mm-active")[0]['offsetTop'];
        if (currentPosition > 500)
        if(this.scrollRef.SimpleBar !== null)
          this.scrollRef.SimpleBar.getScrollElement().scrollTop =
            currentPosition + 300;
      }
    }, 300);
  }

  /**
   * remove active and mm-active class
   */
  _removeAllClass(className) {
    const els = document.getElementsByClassName(className);
    while (els[0]) {
      els[0].classList.remove(className);
    }
  }

  /**
   * Activate the parent dropdown
   */
  _activateMenuDropdown() {
    this._removeAllClass('mm-active');
    this._removeAllClass('mm-show');

    const links:any = document.getElementsByClassName('side-nav-link-ref');
    const paths = [...links].map(link => link.hash);
    const hash = window.location.hash.split('?')[0];
    let menuItemEl;
    const index = paths.indexOf(hash);
    if (index !== -1) {
      menuItemEl = links[index];
    } else {
      const item = hash.substr(0, hash.lastIndexOf('/')).toString();
      const pathIndex = paths.findIndex(path => item.includes(path));
      menuItemEl = links[pathIndex];
    }

    if (!menuItemEl) {
      return;
    }

    const parentEl = menuItemEl.parentElement;
    if (!parentEl) {
      return;
    }

    const addClass = (element, className) => {
      if (element) {
        element.classList.add(className);
      }
    };

    menuItemEl.classList.add('active');
    addClass(parentEl, 'mm-active');

    const parent2El = parentEl.parentElement.closest('ul');
    addClass(parent2El, 'mm-show');

    const parent3El = parent2El.parentElement;
    addClass(parent3El, 'mm-active');
    addClass(parent3El.querySelector('.has-arrow'), 'mm-active');
    addClass(parent3El.querySelector('.has-dropdown'), 'mm-active');

    const parent4El = parent3El.parentElement;
    addClass(parent4El, 'mm-show');

    const parent5El = parent4El.parentElement;
    addClass(parent5El, 'mm-active');
 //   addClass(parent5El.querySelector('.is-parent'), 'mm-active');
  }
  /**
   * Initialize
   */
  initialize(): void {
    this.parentRoute = `/`
    this.menuItems = MENU;

  }

  /**
   * Returns true or false if given menu item has child or not
   * @param item menuItem
   */
  hasItems(item: MenuItem) {
    return item.subItems !== undefined ? item.subItems.length > 0 : false;
  }

  logout() {
    this._authService.logout();
  }
}
