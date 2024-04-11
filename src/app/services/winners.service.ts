import { Injectable } from '@angular/core';
import {HttpClient, HttpParams} from "@angular/common/http";
import {Observable} from "rxjs";
import {Winner} from "../interfaces/IWinners";
import {environment} from "../../environment";

@Injectable({
  providedIn: 'root'
})
export class WinnersService {

  constructor(private httpClient: HttpClient) { }

  public getWinners(): Observable<Winner[]> {
    let httpParams = new HttpParams();
    httpParams = httpParams.append("_page", 1);
    httpParams = httpParams.append("_limit", 7);
    httpParams = httpParams.append("_sort", 'id');
    httpParams = httpParams.append("_order", 'asc');
    return this.httpClient.get<Winner[]>(`${environment.API_URL}/winners`, {
      params: httpParams
    })
  }

  public getWinner(id: number): Observable<Winner> {
    return this.httpClient.get<Winner>(`${environment.API_URL}/winners/${id}`)
  }

  public createWinner(data: Winner): Observable<Winner> {
    return this.httpClient.post<Winner>(`${environment.API_URL}/winners`, data, {
      headers: {
        'Content-Type': 'application/json'
      }
    })
  }

  public deleteWinner(id: number): Observable<Winner> {
    return this.httpClient.delete<Winner>(`${environment.API_URL}/winners/${id}`)
  }

  public updateWinner(id: number, data: Omit<Winner, "id">): Observable<Winner> {
    return this.httpClient.put<Winner>(`${environment.API_URL}/winners/${id}`, data)
  }

}
