import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { AuthService } from '../../../services/auth.service';
import { CookieService } from 'ngx-cookie-service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../sass/auth.scss']
})
export class RegisterComponent {

  register: FormGroup;

  constructor(private formBuilder: FormBuilder, private authService: AuthService,
    private toastr: ToastrService, private readonly route: Router, private cookies:CookieService) {
    this.register = formBuilder.group({
      Id: [new Date().getTime().toString()],
      Email: ['', [Validators.required, Validators.email]],
      pass: ['', Validators.required],
      Address: ['', Validators.required],
      Name: ['', Validators.required],
      Phone: ['', Validators.required],
      RegisterDate: [new Date(), Validators.required],
    })
  }

  get email() {
    return this.register.get("Email")
  }
  get pass() {
    return this.register.get("pass")
  }
  get Name() {
    return this.register.get("Name")
  }
  get Phone() {
    return this.register.get("Phone")
  }
  get Address() {
    return this.register.get("Address")
  }
  get RegisterDate() {
    return this.register.get("RegisterDate")
  }

  submit() {
    if (this.register.valid)
      this.authService.register(this.register.value).subscribe({
        next:(res)=> this.cookies.set("user",JSON.stringify(res))
      })
    else
      this.toastr.error("please,fill all fields")
  }

}
