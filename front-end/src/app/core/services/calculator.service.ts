import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { environment } from 'src/environments/environment';
import { ICalculateArgs } from '../models/ICalculateArgs';
import { ICalculateResponse } from '../models/ICalculateResponse';
import { IHistory } from '../models/IHistory';

@Injectable({
  providedIn: 'root',
})
export class CalculatorService {

  private url = environment.backendUrl;

  constructor(
    private httpClient: HttpClient
  ) { }

  getHistory(): Observable<IHistory[]> {
    return this.httpClient.get<IHistory[]>(`${this.url}/history`);
  }

  calculate(calculateArgs: ICalculateArgs): Observable<ICalculateResponse> {
    return this.httpClient.post<ICalculateResponse>(`${this.url}/calculate`, calculateArgs);
  }

  getHistoryWithFilter(filter: {
    username: string;
    date: string;
    result: string;
    id: number | null;
  }): Observable<IHistory[]> {
    return this.httpClient.post<IHistory[]>(`${this.url}/history/filter`, filter);
  }
}
