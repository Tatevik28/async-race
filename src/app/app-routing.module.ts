import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {GarageComponent} from "./garage/garage.component";
import {WinnersComponent} from "./winners/winners.component";

const routes: Routes = [
  {
    path: '',
    redirectTo: '/home',
    pathMatch: 'full'
  },
  {
    path: 'garage',
    component: GarageComponent
  },
  {
    path: 'winners',
    component: WinnersComponent
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
