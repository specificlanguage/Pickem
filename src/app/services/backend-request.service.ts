import {inject, Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {Game} from "../types/types";
import {environment} from "../../environments/environment";
import {Auth} from "@angular/fire/auth";

@Injectable({
  providedIn: 'root'
})
export class BackendRequestService {

  auth: Auth = inject(Auth)

  constructor(private http: HttpClient) {}

  getGameByID() {
    return this.http.get<Game>
  }

  getGamesByDate(year: number, month: number, day: number) {
    return this.http.get<Game[]>(environment.apiUrl + `/games/date?year=${year}&month=${month}&day=${day}`)
  }

  getGamesBySeries(seriesNum: number){
    return this.http.get<Game[]>(environment.apiUrl + `/games/series?seriesNum=${seriesNum}`)
  }

}
