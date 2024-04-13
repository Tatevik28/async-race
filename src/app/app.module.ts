import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {GarageComponent} from './garage/garage.component';
import {WinnersComponent} from './winners/winners.component';
import {CarService} from "./services/car.service";
import {WinnersService} from "./services/winners.service";
import {HTTP_INTERCEPTORS, HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatPaginatorModule} from '@angular/material/paginator';
import {ErrorInterceptorService} from "./error-interceptor.service";

@NgModule({
  declarations: [
    AppComponent,
    GarageComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    FormsModule,
    CommonModule,
    HttpClientModule,
    MatPaginatorModule
  ],
  providers: [CarService, WinnersService, provideAnimationsAsync(), {provide: HTTP_INTERCEPTORS, useClass: ErrorInterceptorService, multi: true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
