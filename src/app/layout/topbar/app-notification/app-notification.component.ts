import { Component, inject, OnDestroy, OnInit, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import { GlobalSearch } from '@components/search/enum/global-search.enum';
import { API_Config } from '@core/api/api-config/api.config';
import { ApiService } from '@core/api/api.service';
import { ApiRes } from '@core/models';
import { SharedService } from '@shared/services/shared.service';
import * as signalR from '@microsoft/signalr';
import { AuthService, StorageService } from '@core/services';
import {
  HubConnection,
  HubConnectionBuilder,
  IHttpConnectionOptions,
  LogLevel,
} from '@microsoft/signalr';
@Component({
  selector: 'app-notification',
  templateUrl: './app-notification.component.html',
  styleUrls: ['./app-notification.component.scss'],
})
// export class AppNotificationComponent implements OnInit, OnDestroy {

//   _apiService = inject(ApiService);
//   _sharedService = inject(SharedService);
//   _storageService = inject(StorageService);
//   _router = inject(Router);
//   @ViewChild('overlay') overlay: any;

//   modules = GlobalSearch;
//   items: any[] = [];
//   private hubConnection!: signalR.HubConnection;

//   message: string;
//   user: string;
//   ngOnInit(): void {
//     this.startConnection();
//     this.addReceiveMessageListener();
//   }

//   getNotifications(event: MouseEvent, targetEl: any) {
//     this._apiService
//       .get(API_Config.notification.get)
//       .pipe(this._sharedService.takeUntilDistroy())
//       .subscribe({
//         next: (res: ApiRes) => {
//           if (res && res.isSuccess) {
//             this.items = res['result'];
//             this.overlay.show(event, targetEl);
//           }
//         },
//       });
//   }
//   selectItem(item) {
//     console.log('Selected item:', item);
//     if (item?.module == this.modules.Matters) {
//       this._router.navigate(['/matters/list/view/', item?.law_MatterId]);
//     } else if (item?.module == this.modules.Parties) {
//       this._router.navigate(['/matters/list/view/', item?.law_MatterId], {
//         queryParams: { tab: 2 },
//       });
//     } else {
//       this._router.navigate(['/clients/view/', item?.id]);
//     }
//     this.overlay.hide();
//   }

//   startConnection() {
//     const token = this._storageService.getStorage('token');
//     console.log('Token:', token);

//     this.hubConnection = new signalR.HubConnectionBuilder()
//       .withUrl('http://192.168.2.87:8021/signalhub', {
//          accessTokenFactory: () => `Bearer ${this._storageService.getStorage('token')}`
//         // transport: signalR.HttpTransportType.WebSockets,
//         // headers: {
//         //   'Authorization': `Bearer ${token}`
//         // }
//         // {
//         //   // skipNegotiation: true,
//         //   // transport: signalR.HttpTransportType.WebSockets,
//         //   //  accessTokenFactory: () => `Bearer ${this._storageService.getStorage('token')}`
//         // }

//       })
//       .build();

//     this.hubConnection
//       .start()
//       .then(() => console.log('Connection started'))
//       .catch((err) => console.log('Error while starting connection: ' + err));
//   }

//   //   Listen for messages from the server
//   addReceiveMessageListener() {
//     this.hubConnection.on('ReceiveMessage', (message: string) => {
//       console.log('Received message: ', message);
//     });

//   }
//   // BroadCastNotificationCount()

//   sendMessage(user?: string, message?: string) {
//     this.hubConnection
//       .invoke('SendMessage', message, user)
//       .catch((err) => console.error('Error while sending message: ' + err));

//     console.log('SendHiMessage', message, user);
//   }

//   stopConnection() {
//     this.hubConnection.stop();
//   }
//   ngOnDestroy(): void {
//    this.stopConnection()
//   }

//   NotificationCount() {
//     const options: IHttpConnectionOptions = {
//       accessTokenFactory: () => {
//         return 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJlbWFpbCI6ImEuZWxzYWRhbnlAYWxzdXdhaWRpLmFlIiwiSWQiOiI2OTM3YzliMy00YTQzLTQ3YWUtOWE5My04MGExNTJiMTU3YmQiLCJVc2VyTmFtZSI6IkFuYXMiLCJOYW1lQXIiOiLYp9mG2LMiLCJOYW1lRW4iOiJBbmFzIiwiRGVmVXNySWQiOiIzMjdmZWNiYS0zM2NkLTRkOTctYmJhYy0wODM0YzdmMDU4YjciLCJVc2VySW5mbyI6IntcIklkXCI6XCI2OTM3YzliMy00YTQzLTQ3YWUtOWE5My04MGExNTJiMTU3YmRcIixcIk5hbWVFblwiOlwiQW5hc1wiLFwiTmFtZUFyXCI6XCLYp9mG2LNcIixcIlVzZXJOYW1lXCI6XCJBbmFzXCIsXCJJbmRzdElkXCI6MixcIlRpdGxlSWRcIjoyLFwiRGVwdElkXCI6MSxcIkluaXRpYWxcIjpcIkFuYXNcIixcIlRlbE5vXCI6XCIrMjAgMTAgMDM5MTgyMjRcIixcIk1vYmlsZU5vXCI6bnVsbCxcIkVtYWlsXCI6XCJhLmVsc2FkYW55QGFsc3V3YWlkaS5hZVwiLFwiRGVmVXNySWRcIjpcIjMyN2ZlY2JhLTMzY2QtNGQ5Ny1iYmFjLTA4MzRjN2YwNThiN1wiLFwiR29hbFwiOjAsXCJUaW1lU2hlZXREYXRlXCI6XCIyMDI0LTA2LTMwVDAwOjAwOjAwXCJ9Iiwicm9sZSI6WyJBZGRfQ2xpZW50R3JvdXAiLCJVcGRhdGVfQ2xpZW50R3JvdXAiLCJEZWxldGVfQ2xpZW50R3JvdXAiLCJWaWV3X0NsaWVudEdyb3VwIiwiQWRkX0NsaWVudCIsIlVwZGF0ZV9DbGllbnQiLCJEZWFjdGl2YXRlX0NsaWVudCIsIlZpZXdfQ2xpZW50IiwiQWRkX0Fkam91cm5tZW50UmVhc29ucyIsIlVwZGF0ZV9BZGpvdXJubWVudFJlYXNvbnMiLCJEZWxldGVfQWRqb3Vybm1lbnRSZWFzb25zIiwiVmlld19BZGpvdXJubWVudFJlYXNvbnMiLCJBZGRfQ2xpZW50Q29udGFjdCIsIlVwZGF0ZV9DbGllbnRDb250YWN0IiwiRGVsZXRlX0NsaWVudENvbnRhY3QiLCJWaWV3X0NsaWVudENvbnRhY3QiLCJBZGRfRGVwYXJ0bWVudCIsIlVwZGF0ZV9EZXBhcnRtZW50IiwiRGVsZXRlX0RlcGFydG1lbnQiLCJWaWV3X0RlcGFydG1lbnQiLCJBZGRfSW5kdXN0cnkiLCJVcGRhdGVfSW5kdXN0cnkiLCJEZWxldGVfSW5kdXN0cnkiLCJWaWV3X0luZHVzdHJ5IiwiQWRkX0p1ZGljYXR1cmUiLCJVcGRhdGVfSnVkaWNhdHVyZSIsIkRlbGV0ZV9KdWRpY2F0dXJlIiwiVmlld19KdWRpY2F0dXJlIiwiQWRkX0p1cmlzZGljdGlvbiIsIlVwZGF0ZV9KdXJpc2RpY3Rpb24iLCJEZWxldGVfSnVyaXNkaWN0aW9uIiwiVmlld19KdXJpc2RpY3Rpb24iLCJBZGRfTWF0dGVyU3RhdHVzIiwiVXBkYXRlX01hdHRlclN0YXR1cyIsIkRlbGV0ZV9NYXR0ZXJTdGF0dXMiLCJWaWV3X01hdHRlclN0YXR1cyIsIkFkZF9QYXJ0aWVzRGVzY3JpcHRpb24iLCJVcGRhdGVfUGFydGllc0Rlc2NyaXB0aW9uIiwiRGVsZXRlX1BhcnRpZXNEZXNjcmlwdGlvbiIsIlZpZXdfUGFydGllc0Rlc2NyaXB0aW9uIiwiQWRkX1ByYWN0c0FyZWEiLCJVcGRhdGVfUHJhY3RzQXJlYSIsIkRlbGV0ZV9QcmFjdHNBcmVhIiwiVmlld19QcmFjdHNBcmVhIiwiVXBkYXRlX1JhdGUiLCJWaWV3X1JhdGUiLCJBZGRfUmF0ZVR5cGUiLCJVcGRhdGVfUmF0ZVR5cGUiLCJEZWxldGVfUmF0ZVR5cGUiLCJWaWV3X1JhdGVUeXBlIiwiQWRkX1JlZmVycmFsVHlwZSIsIlVwZGF0ZV9SZWZlcnJhbFR5cGUiLCJEZWxldGVfUmVmZXJyYWxUeXBlIiwiVmlld19SZWZlcnJhbFR5cGUiLCJBZGRfUm9sZSIsIlVwZGF0ZV9Sb2xlIiwiRGVsZXRlX1JvbGUiLCJWaWV3X1JvbGUiLCJBZGRfU3RhZ2UiLCJVcGRhdGVfU3RhZ2UiLCJEZWxldGVfU3RhZ2UiLCJWaWV3X1N0YWdlIiwiQWRkX1Rhc2tDb2RlIiwiVXBkYXRlX1Rhc2tDb2RlIiwiRGVsZXRlX1Rhc2tDb2RlIiwiVmlld19UYXNrQ29kZSIsIkFkZF9NYXR0ZXJDYXRlZ29yeSIsIlVwZGF0ZV9NYXR0ZXJDYXRlZ29yeSIsIkRlbGV0ZV9NYXR0ZXJDYXRlZ29yeSIsIlZpZXdfTWF0dGVyQ2F0ZWdvcnkiLCJBZGRfTWF0dGVyVHlwZSIsIlVwZGF0ZV9NYXR0ZXJUeXBlIiwiRGVsZXRlX01hdHRlclR5cGUiLCJWaWV3X01hdHRlclR5cGUiLCJBZGRfTWF0dGVyIiwiRGVhY3RpdmF0ZV9NYXR0ZXIiLCJVcGRhdGVfTWF0dGVyIiwiVmlld19NYXR0ZXIiLCJWaWV3X0dlbmVyYWxfTWF0dGVyIiwiVXBkYXRlX0dlbmVyYWxfTWF0dGVyIiwiQWRkX1BhcnRpZXNfTWF0dGVyIiwiRGVsZXRlX1BhcnRpZXNfTWF0dGVyIiwiVXBkYXRlX01hdHRlcl9QYXJ0aWVzIiwiVmlld19NYXR0ZXJfUGFydGllcyIsIkFkZF9NYXR0ZXJfQWRkcmVzIiwiRGVsZXRlX01hdHRlcl9BZGRyZXMiLCJVcGRhdGVfTWF0dGVyX0FkZHJlcyIsIlZpZXdfTWF0dGVyX0FkZHJlcyIsIkFkZF9NYXR0ZXJfQ29udGFjdHMiLCJEZWxldGVfTWF0dGVyX0NvbnRhY3RzIiwiVXBkYXRlX01hdHRlcl9Db250YWN0cyIsIlZpZXdfTWF0dGVyX0NvbnRhY3RzIiwiQWRkX01hdHRlcl9BY3Rpdml0aWVzIiwiRGVsZXRlX01hdHRlcl9BY3Rpdml0aWVzIiwiVXBkYXRlX01hdHRlcl9BY3Rpdml0aWVzIiwiVmlld19NYXR0ZXJfQWN0aXZpdGllcyIsIlZpZXdfTWF0dGVyX0ludm9pY2VzIiwiVmlld19NYXR0ZXJfVGltZXNoZWV0IiwiVmlld19SZWxhdGVkX01hdHRlcnMiLCJBZGRfTWF0dGVyX0RvY3VtZW50cyIsIkRlbGV0ZV9NYXR0ZXJfRG9jdW1lbnRzIiwiVXBkYXRlX01hdHRlcl9Eb2N1bWVudHMiLCJWaWV3X01hdHRlcl9Eb2N1bWVudHMiLCJEb3dubG9hZF9NYXR0ZXJfRG9jdW1lbnRzIiwiVXBkYXRlX0JpbGxpbmdfU2V0dGluZ3MiLCJWaWV3X0JpbGxpbmdfU2V0dGluZ3MiLCJBZGRfTWF0dGVyX0NsYXNzZXMiLCJEZWxldGVfTWF0dGVyX0NsYXNzZXMiLCJVcGRhdGVfTWF0dGVyX0NsYXNzZXMiLCJWaWV3X01hdHRlcl9DbGFzc2VzIiwiQWRkX01hdHRlcl9BcHBsaWNhbnRzIiwiRGVsZXRlX01hdHRlcl9BcHBsaWNhbnRzIiwiVXBkYXRlX01hdHRlcl9BcHBsaWNhbnRzIiwiVmlld19NYXR0ZXJfQXBwbGljYW50cyIsIkFkZF9Vc2VycyIsIlVwZGF0ZV9Vc2VycyIsIkRlYWN0aXZhdGVfVXNlcnMiLCJWaWV3X1VzZXJzIiwiQ2hhbmdlX3Bhc3N3b3JkX1VzZXJzIiwiVW5sb2NrX1VzZXJzIiwiVmlld19TZWN1cml0eV9Vc2VycyIsIlVwZGF0ZV9TZWN1cml0eV9Vc2VycyIsIkFkZF9TZWN1cml0eV9Hcm91cHMiLCJEZWxldGVfU2VjdXJpdHlfR3JvdXBzIiwiVXBkYXRlX1NlY3VyaXR5X0dyb3VwcyIsIlZpZXdfU2VjdXJpdHlfR3JvdXBzIiwiVmlld19TZWN1cml0eV9UaW1lc2hlZXQiLCJVcGRhdGVfU2VjdXJpdHlfVGltZXNoZWV0IiwiVmlld19TZWN1cml0eV9DYWxlbmRhciIsIlVwZGF0ZV9TZWN1cml0eV9DYWxlbmRhciIsIlZpZXdfU2VjdXJpdHlfTWF0dGVyQWNjZXNzIiwiVXBkYXRlX1NlY3VyaXR5X01hdHRlckFjY2VzcyIsIlVwZGF0ZV9UaW1lU2hlZXREYXRlX1VzZXIiLCJWaWV3X1RpbWVzaGVldCIsIkFkZF9UYXNrTWFuYWdlbWVudCIsIkRlbGV0ZV9UYXNrTWFuYWdlbWVudCIsIlVwZGF0ZV9UYXNrTWFuYWdlbWVudCIsIlZpZXdfVGFza01hbmFnZW1lbnQiLCJJbmN0aXZhdGVfTWF0dGVyIiwiVmlld19SZXBvcnQiLCJWaWV3X0xvb2NrdXAiLCJWaWV3X1NlY3VyaXR5IiwiZGFzaGJvYXJkIiwiQ2FsZW5kZXIiXSwibmJmIjoxNzI1NjA4NjkyLCJleHAiOjE3MjU2OTUwOTIsImlhdCI6MTcyNTYwODY5MiwiaXNzIjoiTGF3LWNsaWVudCIsImF1ZCI6Ikxhdy1hdXRoLWFwaSJ9.5sHYyYQJQCTqFtgZasVp0JD10rnU_DVIU5dafXGEsT8';
//       },
//     };
// }
// }
export class AppNotificationComponent implements OnInit, OnDestroy {
    _storageService = inject(StorageService);
    _authService = inject(AuthService);
      _apiService = inject(ApiService);
  _sharedService = inject(SharedService);
  _router = inject(Router);
    @ViewChild('overlay') overlay: any;

     title = 'SignalrApp';
     private hubConnectionBuilder!: HubConnection;
     offers: any[] = [];
     user : string="";
     message : string = "";
      items: any[] = [];

     constructor() {}
     ngOnDestroy(): void {
       throw new Error('Method not implemented.');
     }
     ngOnInit(): void {

       this.NotificationCount()
   // this.SendMessage();
   }

   SendMessage(){

     this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://192.168.2.87:8021/signalhub').configureLogging(LogLevel.Information).build();
     this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
     this.hubConnectionBuilder.on('SendMessage', (u: string, m : string) => {
       console.log("User : " + u + ", Message : " + m);
       this.user = u;
         this.message = m;
     });

   }

   NotificationCount(){
     const options: IHttpConnectionOptions = {
       accessTokenFactory: () => `Bearer ${this._storageService.getStorage('token')}`

     };
         // let user = this._authService.user;
    // this._authService.user =JSON.parse(this._authService.getDecodedToken()['UserInfo'])

      //this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('https://localhost:7145/signalhub',options).configureLogging(LogLevel.Information).build();

     // const connection = new HubConnectionBuilder()
     //   .configureLogging(LogLevel.Information)
     //   .withUrl(`https://localhost:7145/signalhub`, options)
     //   .build();
      this.hubConnectionBuilder = new HubConnectionBuilder().withUrl('http://192.168.2.87:8021/signalhub',options).configureLogging(LogLevel.Information).build();
       this.hubConnectionBuilder.start().then(() => console.log('Connection started.......!')).catch(err => console.log('Error while connect with server'));
       this.hubConnectionBuilder.on('BroadCastNotificationCount', (connections:string[], sms : number) => {
         console.log( " Message : " + sms);
         this.notificationCount=sms
         //this.user = u;
          //  this.message = sms;
       });
   }
  // private hubConnection!: HubConnection;
  // offers: any[] = [];
  // user: string = '';
  // message: string = '';
  // items: any[] = [];

  // // Inject storage service
  // private storageService = inject(StorageService);

  // constructor() {}

  // // Clean up on destroy
  // ngOnDestroy(): void {
  //   if (this.hubConnection) {
  //     this.hubConnection.stop().then(() => console.log('Connection stopped.'));
  //   }
  // }

  // ngOnInit(): void {
  //   this.initializeNotificationConnection();
  // }

  // // Initialize SignalR connection and set up listeners
  // private initializeNotificationConnection(): void {
  //   const token = this.storageService.getStorage('token');
  //   const options: IHttpConnectionOptions = {
  //     accessTokenFactory: () => `Bearer ${token}`,
  //   };

  //   this.hubConnection = new HubConnectionBuilder()
  //     .withUrl('http://192.168.2.87:8021/signalhub', options)
  //     .configureLogging(LogLevel.Information)
  //     .build();

  //   this.hubConnection
  //     .start()
  //     .then(() => console.log('SignalR connection started'))
  //     .catch((err) => console.error('Error while starting connection: ', err));

  //   // Listen for broadcast notifications
  //   this.hubConnection.on(
  //     'BroadCastNotificationCount',
  //     (connections: string[], sms: string) => {
  //       console.log('Received notification:', sms);
  //       this.message = sms;
  //     }
  //   );
  // }

  // // Send a message (currently unused, can be integrated)
  // private sendMessage(): void {
  //   this.hubConnection.on('SendMessage', (u: string, m: string) => {
  //     console.log(`User: ${u}, Message: ${m}`);
  //     this.user = u;
  //     this.message = m;
  //   });
  // }
  notificationCount:number;
    getNotifications(event: MouseEvent, targetEl: any) {
    this._apiService
      .get(API_Config.notification.get)
      .pipe(this._sharedService.takeUntilDistroy())
      .subscribe({
        next: (res: ApiRes) => {
          if (res && res.isSuccess) {
            this.items = res['result'];
            this.overlay.show(event, targetEl);
          }
        },
      });
  }
}
