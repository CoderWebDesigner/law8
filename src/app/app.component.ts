import { NavigationCancel, NavigationEnd, NavigationError, NavigationStart, RouteConfigLoadEnd, RouteConfigLoadStart, Router, RouterEvent } from '@angular/router';
import { LanguageService } from './@core/services/language.service';
import { AfterViewChecked, AfterViewInit, ApplicationRef, Component, inject, OnDestroy, OnInit } from '@angular/core';
import { SharedService } from '@shared/services/shared.service';
import { forkJoin, Subject, takeUntil } from 'rxjs';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit, OnDestroy {
  _sharedService = inject(SharedService);
  _router = inject(Router);
  _languageService = inject(LanguageService);
  appRef = inject(ApplicationRef);
  appInstated: boolean = false;
  unsubscribeAll: Subject<void> = new Subject<void>();

  isLoading:boolean=true

  ngOnInit(): void {
    this.checkAppLoaded()
    this.checkRoutes()
  }


  checkAppLoaded() {
    this.appRef.isStable.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe(res => {
      if (res) {
        this.appInstated = true;
      }
    })
    this.appRef.attachView
  }



  checkRoutes() {
    this._router.events.pipe(
      takeUntil(this.unsubscribeAll)
    ).subscribe((event: any) => {
      //lazyloading start
      if (event instanceof RouteConfigLoadStart) {
        this.isLoading=true
      }
      //lazy loading end
      else if (event instanceof RouteConfigLoadEnd) {
        this.isLoading=false
      }
    })
  }
  ngOnDestroy(): void {
    this.unsubscribeAll?.next();
    this.unsubscribeAll?.complete();
  }
}
// export class AppComponent implements OnInit,AfterViewChecked{
//   _languageService = inject(LanguageService);
//   _sharedService=inject(SharedService)
//   // _router=inject(Router)
//   appRef = inject(ApplicationRef);
//   isLoading:boolean=true;

//   // constructor(){
//   //   this._languageService.initLang()
//   // }
//   constructor(private router: Router) {
//     // this._languageService.initLang()
//     // this.router.events.subscribe({
//     //   next:(event:any)=>{
//     //     this.navigationInterceptor(event)
//     //   }
//     // })
    
//     // router.events.subscribe({
//     //   next:(event:RouterEvent)=>{
//     //     this.navigationInterceptor(event)
//     //   }
//     // })
//   }
//   ngAfterViewChecked(): void {
//     this.isLoading = false;
//   }
  
//   // Shows and hides the loading spinner during RouterEvent changes
//   navigationInterceptor(event: RouterEvent): void {
//     if (event instanceof NavigationStart) {
//       this.isLoading = true;
//     }
//     if (event instanceof NavigationEnd) {
//       this.isLoading = false;
//     }

//     // Set loading state to false in both of the below events to hide the spinner in case a request fails
//     if (event instanceof NavigationCancel) {
//       this.isLoading = false;
//     }
//     if (event instanceof NavigationError) {
//       this.isLoading = false;
//     }
//   }
//   ngAfterViewInit(): void {
//     // setTimeout(() => {
//     //   this.isLoading = false;
//     //  },500);
//   }
//   ngOnInit(): void {
//     // forkJoin([
//     //   this.appRef.isStable,
//     //   this._sharedService.systemReady$,
//     // ]).subscribe({
//     //   next:(res:any)=>{
//     //     this.isLoading=true
//     //   }
//     // })
//     // this.appRef.isStable.subscribe({
//     //   next:(res)=>{
//     //     this.isLoading=false
//     //     console.log('isStable',res)
//     //   }
//     // })
//     // this._sharedService.systemReady$.subscribe({
//     //   next:(res:boolean)=>{
//     //     console.log('systemReady',res)
//     //   }
//     // })
//     this.checkRoutes() 
//   }
//   checkRoutes() {
//     // this._router.events.subscribe((event: any) => {
//     //   //lazyloading start
//     //   if (event instanceof RouteConfigLoadStart) {
//     //     console.log('loading ..')
//     //     this.isLoading=true
//     //     // this._spinner.show();
//     //   }
//     //   //lazy loading end
//     //   else if (event instanceof RouteConfigLoadEnd) {
//     //     this.isLoading=false
//     //     console.log('finished')
//     //     // this._spinner.hide();
//     //   }
//     // })

//     // window.addEventListener('load', () => {
//     //   this.isLoading = false;
//     // // });
//     // this._router.events.subscribe((event: any) => {
//     //   if (event instanceof NavigationStart) {
//     //     this.isLoading = true;
//     //   } else if (
//     //     event instanceof NavigationEnd ||
//     //     event instanceof NavigationCancel ||
//     //     event instanceof NavigationError
//     //   ) {
//     //     this.isLoading = false;
//     //   }
//     // });
//   }
 
// }
