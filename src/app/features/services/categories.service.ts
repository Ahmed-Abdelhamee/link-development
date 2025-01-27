import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { catchError, Observable, of, retry } from 'rxjs';
import { environment } from '../../core/global/environments';
import { Category } from '../interfaces/categories.interafce';

@Injectable({
  providedIn: 'root'
})
export class CategoriesService {

  DB_url: string = environment.domain;
    
  constructor(private http:HttpClient) { }

  getCategories():Observable<Category[]>{
    return this.http.get<Category[]>(this.DB_url + "8378472d08789a9cb165")
      .pipe(retry(3),catchError((err:any)=> {return of([])}))
  }
}
