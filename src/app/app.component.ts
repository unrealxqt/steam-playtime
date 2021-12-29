import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';
import { Game } from './game';
import { GameDetails } from './game-details';

const apiUrl = "http://localhost:4200/api";
const gameDetailsApiUrl = "http://localhost:4200/details/?appids=";
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
  ngOnInit() {
    this.getOwnedGames().subscribe(response => {
      this.data = response["response"]["games"]
      this.data.forEach(item => {
        this.getGameDetails(item.appid).subscribe(details => {
          let currentGameDetails: GameDetails = {
            appId: item.appid,
            name: details[item.appid]["data"]["name"],
            playtimeForever: item.playtime_forever
          };
          this.titles.push(currentGameDetails);
        })
      })
    })
    console.log(this.titles);

  }

  getOwnedGames(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl)
  }

  getGameDetails(appId: number): Observable<any> {
    return this.http.get<any>(gameDetailsApiUrl + appId, httpOptions);
  }

}
