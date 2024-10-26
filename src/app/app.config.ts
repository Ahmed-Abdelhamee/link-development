import { ApplicationConfig, importProvidersFrom, provideZoneChangeDetection } from '@angular/core';
import { provideRouter, RouterModule } from '@angular/router';

import { routes } from './app.routes';
import { provideHttpClient, withInterceptors } from '@angular/common/http';
import { HashLocationStrategy } from '@angular/common';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastrModule } from 'ngx-toastr';
import { authInterceptor } from './core/interceptors/auth.interceptor';

export const appConfig: ApplicationConfig = {
  providers: [
    provideZoneChangeDetection({ eventCoalescing: true }),
    provideRouter(routes,),
    provideHttpClient(
      withInterceptors([authInterceptor]
    )),
    importProvidersFrom(
      HashLocationStrategy,
      RouterModule.forRoot(routes, { useHash: true,scrollPositionRestoration:"enabled" }),
      BrowserModule,
      BrowserAnimationsModule,
      ToastrModule.forRoot()
    )
  ]
};
