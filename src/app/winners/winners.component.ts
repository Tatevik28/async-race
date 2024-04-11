import {Component, OnInit} from '@angular/core';
import {WinnersService} from "../services/winners.service";
import {Winner} from "../interfaces/IWinners";

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
  public winners: Winner[] = [];
  constructor(private winnersService: WinnersService) {
  }
  ngOnInit() {
    this.winnersService.getWinners().subscribe((res) => {
      this.winners = res;
    })
  }
}
