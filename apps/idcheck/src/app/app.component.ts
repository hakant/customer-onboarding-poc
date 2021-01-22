import { Component } from '@angular/core';

export enum IdCheckEvent {
  Initial = 'Initial',
  PhotosUploaded = 'PhotosUploaded',
  IdCheckStarted = 'IdCheckStarted',
  IdCheckTimedOut = 'IdCheckTimedOut',
  IdCheckFailed = 'IdCheckFailed',
  IdCheckSuccessful = 'IdCheckSuccessful'
}

@Component({
  selector: 'customer-onboarding-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
})
export class AppComponent {
  IdCheckEvent = IdCheckEvent;
  Object = Object;

  title = 'idcheck';
  currentEvent = IdCheckEvent.Initial;

  handleIdCheckEvent(event: IdCheckEvent) {
    this.currentEvent = event;
  }
}
