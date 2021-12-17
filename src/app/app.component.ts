import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from "@angular/common/http";
import { Observable } from 'rxjs';

const apiUrl = "https://if2ewrxrm6.execute-api.eu-central-1.amazonaws.com/live/";
const httpOptions = {
  headers: new HttpHeaders({
    'Content-Type': 'application/json',
    'Accept': 'application/json',
    'Access-Control-Allow-Headers': 'X-Requested-With,content-type',
    'Access-Control-Allow-Origin': 'http://api.steampowered.com',
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

  ngOnInit() {
    this.getOwnedGames().subscribe(data => {
      console.log(data);
    })
  }

  getOwnedGames(): Observable<any[]> {
    return this.http.get<any[]>(apiUrl, httpOptions)
  }

}
