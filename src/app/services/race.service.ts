import { Injectable } from '@angular/core';
import { Race } from '../race';

import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class RaceService {

  constructor(private httpClient: HttpClient) {
  }

  // link vna gehoste app:
  // https://api-gateway-bmelis.cloud.okteto.net/race

  getAllRaces(): Observable<Race[]> {
    return this.httpClient.get<Race[]>("https://api-gateway-bmelis.cloud.okteto.net/race", { withCredentials: true });
  }

  // Misschien nodig voor datum om te zetten
  // getAllRaces(): Observable<Race[]> {
  //   return this.httpClient.get<Race[]>("http://localhost:3000/races").pipe(
  //     map(races => races.map(race => ({ ...race, raceDate: new Date(race.raceDate) })))
  //   );
  // }

  postRace(race: Race): Observable<Race> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.post<Race>("http://localhost:3000/races", race, {headers: headers});

    // return this.httpClient.post<Race>("http://localhost:3000/races", race);
  }

  getRaceById(id: number): Observable<Race[]> {
    return this.httpClient.get<Race[]>("http://localhost:3000/races/"+id);
  }

  deleteRace(id: number): Observable<Race> {
    return this.httpClient.delete<Race>("http://localhost:3000/races/" + id);
  }

  updateRace(id: number, race: Race): Observable<Race> {
    let headers = new HttpHeaders();
    headers = headers.set('Content-Type', 'application/json; charset=utf-8');

    return this.httpClient.put<Race>("http://localhost:3000/races/" + id, race, {headers: headers});
  }
}
