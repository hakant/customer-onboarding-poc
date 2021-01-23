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
  selector: 'customer-onboarding-id-check',
  templateUrl: './id-check.component.html',
  styleUrls: ['./id-check.component.scss']
})
export class IdCheckComponent {

  IdCheckEvent = IdCheckEvent;
  Object = Object;

  title = 'idcheck';
  currentEvent = IdCheckEvent.Initial;

  handleIdCheckEvent(event: IdCheckEvent) {
    this.currentEvent = event;
  }
}
