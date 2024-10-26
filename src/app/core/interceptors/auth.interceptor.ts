import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';


//  ------------------------------ Example on using Interceptors -------------------------------

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const authService = inject(AuthService);
  const router = inject(Router);

  if (authService.getUseToken()) {
    router.navigate(["/auth/login"])
  }

  req = req.clone({
    setHeaders: {
      authorization: 'Bearer ' + authService.getUseToken()
    }
  })
  return next(req);
};
