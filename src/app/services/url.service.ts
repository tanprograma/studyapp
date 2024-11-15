import { computed, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../environments/environment';
import { DOCUMENT } from '@angular/common';
import axios from 'axios';

@Injectable({
  providedIn: 'root',
})
export class UrlService {
  private document = inject(DOCUMENT);
  private BASE_URL =
    environment.env == 'development'
      ? environment.origin
      : this.document.location.origin;
  $axios = axios.create({
    baseURL: `${this.BASE_URL}/api`,
  });
  constructor() {}
}
