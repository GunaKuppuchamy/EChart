import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { catchError, Observable, of } from 'rxjs';
import { error } from 'echarts/types/src/util/log.js';

@Injectable({
  providedIn: 'root'
})
export class ChartService {

  private url='http://localhost:5069/WeatherForecast';

  private weather = [
    { date: '2025-05-04', temperatureC: 43, temperatureF: 109, summary: 'Warm' },
    { date: '2025-05-05', temperatureC: 29, temperatureF: 84, summary: 'Freezing' },
    { date: '2025-05-06', temperatureC: -1, temperatureF: 31, summary: 'Balmy' },
    { date: '2025-05-07', temperatureC: 31, temperatureF: 87, summary: 'Chilly' },
    { date: '2025-05-08', temperatureC: -7, temperatureF: 20, summary: 'Balmy' }
  ];

   constructor(private http: HttpClient){}
   
     getData(): Observable<any>{
      return this.http.get(this.url).pipe(
        catchError(error=>{
          console.error(error);
          return of(this.weather);
        })
      )
     }
}
