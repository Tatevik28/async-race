import { Injectable } from '@angular/core';
import {HttpClient, HttpParams, HttpResponse} from "@angular/common/http";
import {Observable} from "rxjs";
import {Car, CarEngine, CarStatus} from "../interfaces/IGarage";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class CarService {

  constructor(private httpClient: HttpClient) {}

  public getCars(pageNumber: number): Observable<HttpResponse<Car[]>> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("_page", pageNumber);
    httpParams = httpParams.append("_limit", 7);
    return this.httpClient.get<Car[]>(`${environment.API_URL}/garage`, {
      params: httpParams,
      observe: 'response'
    })
  }

  public getCar(id: number): Observable<Car> {
    return this.httpClient.get<Car>(`${environment.API_URL}/garage/${id}`)
  }

  public createCar(data: Car): Observable<Car> {
    return this.httpClient.post<Car>(`${environment.API_URL}/garage`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteCar(id: number): Observable<Car> {
    return this.httpClient.delete<Car>(`${environment.API_URL}/garage/${id}`)
  }

  public updateCar(id: number, data: Omit<Car, 'id'>): Observable<Car> {
    return this.httpClient.put<Car>(`${environment.API_URL}/garage/${id}`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public updateCarStatus(id: number, status: CarStatus): Observable<CarEngine> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("id", id);
    httpParams = httpParams.append("status", status);

    return this.httpClient.patch<CarEngine>(`${environment.API_URL}/engine`, {},{
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
