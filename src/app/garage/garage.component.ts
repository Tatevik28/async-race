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
  public totalCountOfPages: number = 0;
  private pageNumber: number = 1;

  @ViewChild('createForm') createForm: any;
  @ViewChild('updateForm') updateForm: any;
  constructor(private carService: CarService) {
  }


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

  updateCarStatus(id: number | undefined, status: CarStatus) {
    this.carService.updateCarStatus(id as number, status).subscribe();
  }
}
