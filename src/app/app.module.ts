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
import { provideAnimationsAsync } from '@angular/platform-browser/animations/async';
import {MatPaginatorModule} from '@angular/material/paginator';

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
  providers: [CarService, WinnersService, provideAnimationsAsync()],
  bootstrap: [AppComponent]
})
export class AppModule { }
