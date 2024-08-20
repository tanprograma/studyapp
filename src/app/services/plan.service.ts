import { inject, Injectable } from '@angular/core';
import { Plan } from '../interfaces/plan';
import { catchError } from 'rxjs';
import { HttpService } from './http.service';
import { UrlService } from './url.service';

@Injectable({
  providedIn: 'root',
})
export class PlanService {
  http = inject(HttpService);
  urls = inject(UrlService);
  constructor() {}
  post(data: Plan) {
    const url = `${this.urls.PLAN_API}/create`;
    return this.http
      .post<Plan>(url, data)
      .pipe(catchError(this.http.handleError<Plan | undefined>('plan post')));
  }
  get() {
    const url = `${this.urls.PLAN_API}`;
    return this.http
      .get<Plan[]>(url)
      .pipe(catchError(this.http.handleError<Plan[]>('plans fetch', [])));
  }
  complete(data: { _id: string }) {
    const url = `${this.urls.PLAN_API}/complete`;
    return this.http
      .post<any>(url, data)
      .pipe(catchError(this.http.handleError<Plan | undefined>('update plan')));
  }
}
