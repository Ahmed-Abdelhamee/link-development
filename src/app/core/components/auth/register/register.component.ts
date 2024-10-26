import { Component } from '@angular/core';
import { FormGroup, FormBuilder, Validators, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { ToastrModule, ToastrService } from 'ngx-toastr';
import { CommonModule } from '@angular/common';
import { Router, RouterModule } from '@angular/router';
import { UsersService } from '../../../../shared/services/users.service';
import { environment } from '../../../global/environments';
import { AuthService } from '../../../services/auth.service';

@Component({
  selector: 'app-register',
  standalone: true,
  imports: [CommonModule, FormsModule, ReactiveFormsModule, ToastrModule, RouterModule],
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss', '../../../modal/auth.scss']
})
export class RegisterComponent {

  register: FormGroup;

  constructor(private formBuilder: FormBuilder, private usersService: UsersService, private authService: AuthService,
    private toastr: ToastrService, private readonly route: Router) {
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
      this.usersService.getUsers().subscribe(users => {
        if (!users.find(item => item.Email == this.register.value.Email)) {
          this.usersService.createUser(this.register.value).subscribe((user) => {
            this.authService.setUser(user);
            this.route.navigate([''])
            this.toastr.success("Your Account Created Successfully")
          })
        } else {
          this.toastr.error("This Account Already Exists");
          this.route.navigate(["/auth/login"])
        }
      })
    else
      this.toastr.error("please,fill all fields")
  }

}
