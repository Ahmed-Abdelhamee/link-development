import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Product } from '../../core/interfaces/product.interface';
import { environment } from '../../core/global/environments';

@Injectable({
  providedIn: 'root'
})
export class ProductsService {

  DB_url: string = environment.domain

  constructor(private http: HttpClient) { }

  getProducts(): Observable<Product[]> {
    return this.http.get<Product[]>(`${this.DB_url}/products`)
  }

}
