import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import { User } from '../../core/interfaces/users.interface';
import { environment } from '../../core/global/environments';

@Injectable({
  providedIn: 'root'
})
export class UsersService {

  DB_url: any = environment.domain;
  user:User ={} as User

  constructor(private http: HttpClient) { }

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.DB_url}/users`)
  }

  createUser(user: User) {
    return this.http.post(`${this.DB_url}/users`, user)
  }


}
