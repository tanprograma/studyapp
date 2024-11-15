import { isPlatformBrowser } from '@angular/common';
import { inject, Injectable, PLATFORM_ID } from '@angular/core';

@Injectable({
  providedIn: 'root',
})
export class AppService {
  platformID = inject(PLATFORM_ID);
  constructor() {}
  isLoggedIn() {
    if (isPlatformBrowser(this.platformID)) {
      return sessionStorage.getItem('user');
    }
    return null;
  }
}
