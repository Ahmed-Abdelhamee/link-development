import { RouterModule } from '@angular/router';
import { Component } from '@angular/core';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';

@Component({
  selector: 'app-auth',
  standalone: true,
  imports: [RouterModule, LoginComponent, RegisterComponent],
  templateUrl: './auth.component.html',
  styleUrls: ['./auth.component.scss', '../../modal/auth.scss','../../../shared/modal/main.scss']
})
export class AuthComponent {


}
