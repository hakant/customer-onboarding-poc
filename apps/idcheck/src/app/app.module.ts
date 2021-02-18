import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { RouterModule } from '@angular/router';
import { IdCheckComponent } from './id-check/id-check.component';

@NgModule({
  declarations: [AppComponent, IdCheckComponent],
  imports: [
    BrowserModule,
    HttpClientModule,
    RouterModule.forRoot([
      {
        path: 'id-check/:onboardingId/:idCheckId/:idCheckIndex',
        component: IdCheckComponent
      }
    ], { initialNavigation: 'enabled' }),
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
