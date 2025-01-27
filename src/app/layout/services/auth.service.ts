import { register } from 'swiper/element/bundle';
import { Injectable } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private toastr: ToastrService) { }

  // handling login without API   
  login(user: any): Observable<any> {
    user.token = '.....' 
    return of(user)
  }

  // handling register without API   
  register(user: any): Observable<any> {
    user.token = '.....'
    return of(user)
  }
}
