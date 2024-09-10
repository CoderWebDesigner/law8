import { Component, ElementRef, inject, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { SharedService } from '@shared/services/shared.service';

@Component({
  selector: 'app-search',
  templateUrl: './app-search.component.html',
  styleUrls: ['./app-search.component.scss'],
})
export class AppSearchComponent {
  @ViewChild('overlay') overlay: any;
  @ViewChild('searchInput') searchInput: ElementRef;

  _apiService=inject(ApiService)
  _sharedService=inject(SharedService)
  _router=inject(Router)

  overlayWidth = '315px';


  filteredItems: any[];
  items = [];
  onSearch(event: any,targetEl?:any) {
    const input = (event.target as HTMLInputElement)?.value?.trim()
    console.log('input value',input)
    if(input.length>3){
      let body={
        search:input
      }
      this._apiService.get(API_Config.search.quickSearch,body).pipe(
        this._sharedService.takeUntilDistroy()
      ).subscribe({
        next:(res:ApiRes)=>{
          if(res&&res.isSuccess){
            this.items=res.result
            this.overlay.show(event,targetEl);
          }
        }
      })
    }else{
      this.items=[]
    }
    // const input = (event.target as HTMLInputElement).value;
    // this.filteredItems = this.items.filter(item => item.name.toLowerCase().includes(input.toLowerCase()));
    // if (input) {
    //   this.overlay.show(event);
    // } else {
    //   this.overlay.hide();
    // }
  }
  increaseWidth(event:any,targetEl:any) {
    this.searchInput.nativeElement.classList.add('focused');
    this.overlayWidth = '800px';
    this.onSearch(event,targetEl)
  }
  selectItem(item) {
    console.log('Selected item:', item);
    if(item?.module=='Matter'){
      this._router.navigate(['/matters/list/view/',item?.id])
    }else{
      this._router.navigate(['/clients/view/',item?.id])
    }
    this.overlay.hide();
  }
  

  resetWidth() {
    this.searchInput.nativeElement.classList.remove('focused');
    this.overlayWidth = '315px';
  }
}
