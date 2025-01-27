import { Injectable } from '@angular/core';
import { environment } from '../../core/global/environments';
import { HttpClient } from '@angular/common/http';
import { Banner } from '../interfaces/banner.interface';
import { catchError, Observable, of, retry, throwError } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class BannerService {

  DB_url: string = environment.domain;
  
  constructor(private http:HttpClient) { }

  getBanner():Observable<Banner[]>{
    return this.http.get<Banner[]>(this.DB_url + "2c9281eddfb0e4be229b")
    .pipe(retry(3),catchError((err:any)=> {return of([])}))
  }
}
