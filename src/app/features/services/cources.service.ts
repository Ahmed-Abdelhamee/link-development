import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../core/global/environments';
import { Course } from '../interfaces/course.interface';

@Injectable({
  providedIn: 'root'
})
export class CourcesService {

  DB_url: string = environment.domain;
  
  constructor(private http:HttpClient) { }

  getCources():Observable<Course[]>{
    return this.http.get<Course[]>(this.DB_url + "983f88db4d99fec8edd9")
      .pipe(retry(3),catchError((err:any)=> {return of([])}))
  }
}
