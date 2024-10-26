import { Injectable } from '@angular/core';
import { UsersService } from '../../shared/services/users.service';
import { ToastrService } from 'ngx-toastr';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private usersService: UsersService, private toastr: ToastrService) { }

  // as handling login without API   ---- using only the JSON files data 
  login(loginEmail: string): Promise<boolean> {
    return new Promise((resolve, reject) => {
      this.usersService.getUsers().subscribe(users => {
        let user = users.find(item => item.Email == loginEmail)
        if (user) {
          this.setUser(user)
          return resolve(true);
        } else {
          return reject(new Error('Not Found'));
        }
      })
    })
  }

  setUser(user: any) {
    localStorage.setItem("user", JSON.stringify(user))
  }

  // as an example on handling token
  getUseToken() {
    return (JSON.parse(localStorage.getItem("user")!))?.token
  }
}
