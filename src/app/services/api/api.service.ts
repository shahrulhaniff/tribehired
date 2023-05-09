import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { tap } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {
  baseUrl = ''; //environment.apiRoot;
  sitelink : any;
  public loading = false;

  constructor(
    private http: HttpClient
  ) {
    // method #1
    this.sitelink = 'https://jsonplaceholder.typicode.com/';
  }

  // method #2
  public typicode() {
    return "https://jsonplaceholder.typicode.com/";
  }


  // GET
  public get(controller: string) {
    this.loading = true;
    return this.http.get(this.baseUrl + controller);
  }
  public read(controller: string, id: string) {
    this.loading = true;
    return this.http.get(this.baseUrl + controller + '/' + id);
  }
  // CREATE
  create(controller: any, model: any) {
    return this.post(controller, model);
  }

  // Post
  postSimple(controller: string) {
    this.loading = true;
    return this.http.post(this.baseUrl + controller, {});
  }
  // Post
  post(controller: string, model:any) {
    this.loading = true;
    return this.http.post(this.baseUrl + controller, model);
  }

  public getAsync(controller: string): Observable<any> {
    this.loading = true;
    return this.http.get<any>(this.baseUrl + controller).pipe(tap((_) => console.log('Loaded')));
  }

  // list
  public list(listName: string) {
    this.loading = true;
    return this.http.get(this.baseUrl + 'list/' + listName);
  }

  // READ
  public getWithId(controller: string, model: any) {
    this.loading = true;
    return this.http.get(this.baseUrl + controller + '/' + model.id);
  }

  // Update
  public update(controller: string, model: any) {
    this.loading = true;
    return this.http.put(this.baseUrl + controller + '/' + model.id, model);
  }

  // Delete
  public delete(controller: string, model: any) {
    this.loading = true;
    return this.http.delete(this.baseUrl + controller + '/' + model.id);
  }

}
