import { inject } from '@angular/core';
import { CanActivateFn, Router } from '@angular/router';
import { CookieService } from 'ngx-cookie-service';

export const authGuard: CanActivateFn = (route, state) => {
  const cookies = inject(CookieService);

  if (cookies.get('user'))
    return true;
  else {
    inject(Router).navigate(["/auth/login"])
    return false
  }
};
