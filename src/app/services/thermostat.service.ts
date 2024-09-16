import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class ThermostatService {

  constructor(
    // classe de connection à une API
    private readonly httpClient: HttpClient
  ) { }

  changeTemperature(data: any) {
    return this.httpClient.post(environment.api_url + 'Thermostat', data)
  }
}
