import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Game } from './game';
import { GameDetails } from './game-details';

const APIKEY = "B31DA39EF46BD64EF39BF7813E746FA5"
const STEAMID = "76561198364413370"
const apiUrl = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=" + APIKEY + "&steamid=" + STEAMID;
const gameDetailsApiUrl = "https://store.steampowered.com/api/appdetails/?appids=";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true',
    'Access-Control-Allow-Methods': 'GET,POST,OPTIONS,DELETE,PUT'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }
  data: Game[]
  titles: GameDetails[] = []
  sortedTitles: GameDetails[] = []
  ngOnInit() {
    this.getOwnedGames().subscribe(response => {
      this.data = response["response"]["games"]
      this.data.forEach(item => {
        this.getGameDetails(item.appid).subscribe(details => {
          let currentGameDetails: GameDetails = {
            appId: item.appid,
            name: details[item.appid]["data"]["name"],
            playtimeForever: roundTo(item.playtime_forever / 60, 0)
          };
          this.titles.push(currentGameDetails);
        })
      })
    })
  }

  getOwnedGames(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl)
  }

  getGameDetails(appId: number): Observable<any> {
    return this.http.get<any>(gameDetailsApiUrl + appId, httpOptions);
  }

}

function compare(a: number | string, b: number | string, isAsc: boolean) {
  return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
}

const roundTo = function (num: number, places: number) {
  const factor = 10 ** places;
  return Math.round(num * factor) / factor;
};