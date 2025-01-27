import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../core/global/environments';
import { slider } from '../interfaces/slider.interface';

@Injectable({
  providedIn: 'root'
})
export class SliderService {

  DB_url: string = environment.domain;
  
  constructor(private http:HttpClient) { }

  getSlider():Observable<slider[]>{
    return this.http.get<slider[]>(this.DB_url + "8494c045d50509ba0d5a")
    .pipe(retry(3),catchError((err:any)=> {return of([])}))
  }
}
