import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const apikey = "3B0A32FBF369D3465B9CCAD619F8A54A";
const steamUserId = "76561198364413370";
const apiUrl = "https://api.steampowered.com/IPlayerService/GetOwnedGames/v1/?key=";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*',
    'Access-Control-Allow-Credentials': 'true'
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