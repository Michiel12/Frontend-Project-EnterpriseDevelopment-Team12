import { Injectable } from '@angular/core';
import { Race } from '../race';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private httpClient: HttpClient) {
  }

  getAllRaces(): Observable<Race[]> {
    return this.httpClient.get<Race[]>("https://api-gateway-bmelis.cloud.okteto.net/race");
  }

  postRace(race: Race): Observable<Race> {
    // let headers = new HttpHeaders();
    // headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    // return this.httpClient.post<Race>("https://api-gateway-bmelis.cloud.okteto.net/race", race, {headers: headers});

    return this.httpClient.post<Race>("https://api-gateway-bmelis.cloud.okteto.net/race", race);
  }

  getRaceById(id: number): Observable<Race[]> {
    return this.httpClient.get<Race[]>("https://api-gateway-bmelis.cloud.okteto.net/race/"+id);
  }

  deleteRace(id: number): Observable<Race> {
    return this.httpClient.delete<Race>("https://api-gateway-bmelis.cloud.okteto.net/race/" + id);
  }

  updateRace(id: number, race: Race): Observable<Race> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Race>("https://api-gateway-bmelis.cloud.okteto.net/race/" + id, race, {headers: headers});
  }
}
