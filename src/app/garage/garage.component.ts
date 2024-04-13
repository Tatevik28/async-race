import {Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../services/car.service";
import {Car, CarEngine, CarStatus} from "../interfaces/IGarage";
import {catchError, forkJoin, Observable, of, switchMap, tap} from "rxjs";
import {WinnersService} from "../services/winners.service";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit{
  public cars: Car[] = [];
  public selectedCar: Car | undefined = undefined;
  public totalCountOfPages: number = 0;
  public driving: boolean = false;
  private pageNumber: number = 1;


  @ViewChild('createForm') createForm: any;
  @ViewChild('updateForm') updateForm: any;
  constructor(
        private carService: CarService,
        private winnersService: WinnersService)
  {}


  ngOnInit() {
    this.getCars(this.pageNumber);
  }

  changePage(event: any) {
    this.pageNumber = event.pageIndex + 1;
    this.getCars(this.pageNumber);
  }

  selectCar(car: Car) {
    this.selectedCar = car;
  }

  getCars(pageNumber: number) {
    this.carService.getCars(pageNumber).subscribe((res) => {
      this.totalCountOfPages = Number(res.headers.get('X-Total-Count'))
      this.cars = res.body as Car[];
    })
  }

  createCar() {
    this.carService.createCar(this.createForm.value).subscribe((res) => {
      this.getCars(this.pageNumber)
      this.createForm.reset();
    });
  }

  updateCar() {
    if (!this.selectedCar) {
      return
    }

    let value: Car = {} as Car;
    if (this.updateForm.value.name && this.updateForm.value.name !== this.selectedCar.name) {
      value['name'] = this.updateForm.value.name;
    }
    if (this.updateForm.value.color && this.updateForm.value.color !== this.selectedCar.color) {
      value['color'] = this.updateForm.value.color;
    }

    this.carService.updateCar(this.selectedCar?.id as number, value).subscribe((res) => {
      this.cars.forEach(car => {
        if (car.id === this.selectedCar?.id) {
          car = Object.assign(car, res);
          this.updateForm.reset()
        }
      });
    });
  }

  deleteCar(id: number | undefined) {
    this.carService.deleteCar(id as number).subscribe(
      (res) => {
        this.getCars(this.pageNumber);
      }
    )
  }

  generateCars() {
    this.getCars(this.pageNumber);
  }

  startDriving(car: Car) {
    this.updateCarStatus(car.id, 'started').subscribe(() => {
      car.driving = true;
      this.updateCarStatus(car.id, 'drive').subscribe(() => {
      }, (err) => {
        car.driving = false;
      });
    })
  }

  stopDriving(car: Car) {
    this.updateCarStatus(car.id, 'stopped').subscribe(() => {
      car.driving = false;
    });
  }

  stopGroupDriving() {
    this.driving = false;
    this.cars.forEach(car => {
      this.updateCarStatus(car.id, 'stopped').subscribe(() => {
        car.driving = false;
      });
    })
  }

  startGroupDriving() {
    this.driving = true;
    const observables: Observable<any>[] = [];
    const successfulCars: any[] = [];

    this.cars.forEach(car => {
      const carUpdateObservable = this.updateCarStatus(car.id, 'started');

      const driveObservable = carUpdateObservable.pipe(
        switchMap(engine => {
          car.driving = true;
          const id = car.id;
          return this.carService.updateCarStatus(id as number, 'drive').pipe(
            tap(() => {
              successfulCars.push({ id, ...engine })
            }),
            catchError(error => {
              car.driving = false;
              console.error(`Error updating car status for car ${id} during 'drive' operation:`, error);
              return of(null);
            })
          );
        }),
      );

      observables.push(driveObservable);
    });

    forkJoin(observables).subscribe(() => {
      let carSpeed = 0;
      let car: CarEngine = {} as CarEngine;
      successfulCars.forEach(successfulCar => {
        if (successfulCar.velocity > carSpeed) {
          carSpeed = successfulCar.velocity;
          car = successfulCar
        }
      })
      this.createOrUpdateWinner(car as CarEngine)
    });
  }

  updateCarStatus(id: number | undefined, status: CarStatus): Observable<any> {
    return this.carService.updateCarStatus(id as number, status);
  }

  createOrUpdateWinner(car: CarEngine) {
    this.winnersService.getWinner(car.id as number).subscribe((winner) => {
        this.winnersService.updateWinner(car.id as number, {
          wins: winner.wins + 1,
          time: Math.floor(car.distance / car.velocity)
        }).subscribe()

    },
      (err) => {
        this.winnersService.createWinner({
          id: car.id as number,
          wins: 1,
          time: Math.floor(car.distance / car.velocity)
        }).subscribe()
      })
      window.alert(`Winner id is ${car.id}, time is ${Math.floor(car.distance / car.velocity)}`)
  }
}
