import {Component, OnInit} from '@angular/core';
import {WinnersService} from "../services/winners.service";
import {Winner} from "../interfaces/IWinners";
import {CarService} from "../services/car.service";

@Component({
  selector: 'app-winners',
  templateUrl: './winners.component.html',
  styleUrl: './winners.component.scss'
})
export class WinnersComponent implements OnInit {
  public winners: Winner[] = [];
  public totalCountOfPages: number = 0;
  private pageNumber: number = 1;

  constructor(private winnersService: WinnersService,
              private carService: CarService) {
  }

  ngOnInit() {
    this.getWinners(this.pageNumber);
  }

  getWinners(pageNumber: number) {
    this.winnersService.getWinners(pageNumber).subscribe((res) => {
      this.totalCountOfPages = Number(res.headers.get('X-Total-Count'))
      res.body?.forEach(winner => {
        this.carService.getCar(winner.id).subscribe((car) =>{
          this.winners.push({...winner, name: car.name, color: car.color})
        })
      })
    })
  }

  changePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getWinners(this.pageNumber);
  }
}
