import { HttpInterceptorFn } from '@angular/common/http';
import { inject } from '@angular/core';
import { Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';


//  ------------------------------ Example on using Interceptors -------------------------------

export const authInterceptor: HttpInterceptorFn = (req, next) => {

  const router = inject(Router);
  const cookies = inject(CookieService);

  if (!cookies.get('user')) {
    router.navigate(["/auth/login"])
  }

  req = req.clone({
    setHeaders: {
      authorization: 'Bearer ' + JSON.parse(cookies.get('user')).token
    }
  })
  return next(req);
};
