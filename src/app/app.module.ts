import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import {ReactiveFormsModule} from "@angular/forms";
import { GarageComponent } from './garage/garage.component';
import { WinnersComponent } from './winners/winners.component';
import {CarService} from "./services/car.service";
import {WinnersService} from "./services/winners.service";

@NgModule({
  declarations: [
    AppComponent,
    GarageComponent,
    WinnersComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    ReactiveFormsModule
  ],
  providers: [CarService, WinnersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
