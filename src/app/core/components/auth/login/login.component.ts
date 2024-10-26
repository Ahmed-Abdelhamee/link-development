import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, FormsModule, ReactiveFormsModule, Validators } from '@angular/forms';
import { AuthService } from '../../../services/auth.service';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { Router, RouterModule } from '@angular/router';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, RouterModule],
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss', '../../../modal/auth.scss']
})
export class LoginComponent {

  login: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private readonly route: Router) {
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
      this.authService.login(this.login.value.email)
        .then(() => { this.toastr.success("login successfully"); this.route.navigate([""]); })
        .catch(() => { this.toastr.error("email or pass not correct") })
    else
      this.toastr.error("please,write your email & pass")
  }
}
