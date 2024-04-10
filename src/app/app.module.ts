import {NgModule} from '@angular/core';
import {BrowserModule} from '@angular/platform-browser';

import {AppRoutingModule} from './app-routing.module';
import {AppComponent} from './app.component';
import {FormsModule} from "@angular/forms";
import {GarageComponent} from './garage/garage.component';
import {WinnersComponent} from './winners/winners.component';
import {CarService} from "./services/car.service";
import {WinnersService} from "./services/winners.service";
import {HttpClientModule} from "@angular/common/http";
import {CommonModule} from "@angular/common";

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
    HttpClientModule
  ],
  providers: [CarService, WinnersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
