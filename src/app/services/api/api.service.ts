import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  sitelink : any;

  constructor() {
    // methos #1
    this.sitelink = 'https://jsonplaceholder.typicode.com/';
   }

  // method #2
  public typicode() {
    return "https://jsonplaceholder.typicode.com/";
  }
}
