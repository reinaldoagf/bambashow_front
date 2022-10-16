import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { environment } from './../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class RestService {

  constructor(private http: HttpClient) { }

  public get(path:string):Promise<Object>{
    return this.http.get(`${environment.url_api}${path}`,{
      headers:new HttpHeaders({
        "charset":"UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*"
      })
    }).toPromise(); // GET  
  }

  public post(path:string, body):Promise<Object>{
    return this.http.post(`${environment.url_api}${path}`,body,{
      headers:new HttpHeaders({
          "charset":"UTF-8",
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"          
      })
    }).toPromise(); // POST
  }

  public put(path:string, body):Promise<Object>{
    return this.http.put(`${environment.url_api}${path}`,body,{
      headers:new HttpHeaders({
          "charset":"UTF-8",
          "accept": "application/json",
          "Access-Control-Allow-Origin":"*"          
      })
    }).toPromise(); // PUT  
  }

  public delete(path:string):Promise<Object>{
    return this.http.delete(`${environment.url_api}${path}`,{
      headers:new HttpHeaders({
        "charset":"UTF-8",
        "accept": "application/json",
        "Access-Control-Allow-Origin":"*"        
      })
    }).toPromise(); // DELETE  
  }
}