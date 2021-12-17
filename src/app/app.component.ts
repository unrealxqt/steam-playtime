import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const apikey = "852C5FC1C2C03B2470608ECA0686A8BA";
const steamUserId = "76561198364413370";
const apiUrl = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*'
  })
};

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {

  constructor(private http: HttpClient) { }

  ngOnInit() {
    this.getOwnedGames().subscribe(data => {
      console.log(data);
    })
  }

  getOwnedGames(): Observable<any> {
    return this.http.get(apiUrl + apikey + "&steamId=" + steamUserId, httpOptions)
  }

}