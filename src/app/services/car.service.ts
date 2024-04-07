import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car, CarEngine, CarStatus} from "../interfaces/IGarage";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {}

  public getCars(): Observable<Car[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("_page", 1);
    return this.httpClient.get<Car[]>('/garage', {
      params: httpParams
    })
  }

  public getCar(id: number): Observable<Car> {
    return this.httpClient.get<Car>(`/garage:${id}`)
  }

  public createCar(data: Car): Observable<Car> {
    return this.httpClient.post<Car>(`/garage`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteCar(id: number): Observable<Car> {
    return this.httpClient.delete<Car>(`/garage:${id}`)
  }

  public updateCar(id: number, data: Omit<Car, 'id'>): Observable<Car> {
    return this.httpClient.put<Car>(`/garage:${id}`, data)
  }

  public updateCarStatus(id: number, status: CarStatus): Observable<CarEngine> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("id", id);
    httpParams = httpParams.append("status", status);

    return this.httpClient.patch<CarEngine>('/engine', {
      params: httpParams
    })
  }

  public updateCarDriveStatus(id: number): Observable<{ success: boolean }> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("id", id);
    httpParams = httpParams.append("status", 'drive');

    return this.httpClient.patch<{ success: boolean }>('/engine', {
      params: httpParams
    })
  }
}
