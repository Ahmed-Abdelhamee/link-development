import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../sass/auth.scss'],
})
export class LoginComponent {

  login: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private readonly route: Router ,private cookies:CookieService) {
    this.login = formBuilder.group({
      email: ['', [Validators.required, Validators.email]],
      pass: ['']
    })
  }

  get email() {
    return this.login.get("email")
  }

  get pass() {
    return this.login.get("pass")
  }

  submit() {
    if (this.login.valid)
      this.authService.login(this.login.value).subscribe({
        next:(res)=> {this.cookies.set("user",JSON.stringify(res));
        }
      })
    else
      this.toastr.error("please,write your email & pass")
  }
}
