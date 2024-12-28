import { Injectable, inject } from '@angular/core';
import { HttpClient} from '@angular/common/http';
import { Observable } from 'rxjs';
import { API_KEYSECRET } from './API_KEY';
import { Coords } from '../types/Coords';


@Injectable({
  providedIn: 'root'
})
export class WeatherService {
  http: HttpClient = inject(HttpClient);
  private API_KEY: string = API_KEYSECRET;
  private weatherUrl: string = 'https://api.openweathermap.org/data/2.5/weather?q=';

  getWeather(city: string): Observable<Coords> {
    return this.http.get<Coords>(this.weatherUrl + city + '&appid=' + this.API_KEY)
  }
}
