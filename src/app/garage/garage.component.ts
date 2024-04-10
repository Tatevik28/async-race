import {Component, OnInit, ViewChild} from '@angular/core';
import {CarService} from "../services/car.service";
import {Car, CarStatus} from "../interfaces/IGarage";

@Component({
  selector: 'app-garage',
  templateUrl: './garage.component.html',
  styleUrl: './garage.component.scss'
})
export class GarageComponent implements OnInit{
  public cars: Car[] = [];
  public selectedCar: Car | undefined = undefined;

  @ViewChild('createForm') createForm: any;
  @ViewChild('updateForm') updateForm: any;
  constructor(private carService: CarService) {
  }


  ngOnInit() {
    this.carService.getCars().subscribe((res) => {
      this.cars = res;
    })
  }

  selectCar(car: Car) {
    this.selectedCar = car;
  }

  createCar() {
    this.carService.createCar(this.createForm.value).subscribe((res) => {
      this.cars.unshift(res)
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
        }
      });
    });
  }

  deleteCar(id: number | undefined) {
    this.carService.deleteCar(id as number).subscribe(
      (res) => {
        this.cars = this.cars.filter(car => car.id !== id)
      }
    )
  }

  updateCarStatus(id: number | undefined, status: CarStatus) {
    this.carService.updateCarStatus(id as number, status).subscribe();
  }
}
