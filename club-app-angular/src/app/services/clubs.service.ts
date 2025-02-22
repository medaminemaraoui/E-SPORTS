import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {environment} from '../../environments/environment';
import {Observable} from 'rxjs';
import {Club, Reserv, Terrain} from '../model/terrains.model';

@Injectable({
  providedIn: 'root'
})
export class ClubsService {

  constructor(private http: HttpClient) { }

  public getAllTerrains(): Observable<Array<Terrain>> {
    return  this.http.get<Array<Terrain>> (`${environment.backendHost}/terrains`);

    }


  public getClubs(): Observable<Array<Club>> {
    return  this.http.get<Array<Club>> (`${environment.backendHost}/clubs`);

  }

  public getReserv(): Observable<Array<Reserv>> {
    return  this.http.get<Array<Reserv>> (`${environment.backendHost1}/reservations`);

  }

  // public getClubTerrains(code:string): Observable<Array<Terrain>> {
  //   return  this.http.get<Array<Terrain>> (`${environment.backendHost}/${code}/terrains`);
  // }

  public saveTerrain(formData:any): Observable<Terrain> {
    return  this.http.post<Terrain>(`${environment.backendHost}/terrains`,formData);
  }

  // Delete a terrain by ID
  public deleteTerrain(id: number): Observable<string> {
    return this.http.delete<string>(`${environment.backendHost}/terrains/${id}`);
  }

}
