import {
  Component,
  inject,
  OnInit,
  AfterViewInit,
  ChangeDetectionStrategy,
  effect,
} from '@angular/core';
import {
  ActivatedRoute,
  Router,
  RouterLink,
  RouterLinkActive,
  RouterOutlet,
} from '@angular/router';

import { UrlService } from './services/url.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

import { MatIconModule } from '@angular/material/icon';
import { MatButtonModule } from '@angular/material/button';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatMenuModule } from '@angular/material/menu';
import { MatListModule } from '@angular/material/list';
import { USER_STATE } from './store/user.store';
import { APP_STATE } from './store/app.store';
import { LoadIndicatorComponent } from './components/load-indicator/load-indicator.component';
type Link = { name: string; url: string };
@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    MatIconModule,
    MatToolbarModule,
    MatButtonModule,
    MatMenuModule,
    MatListModule,
    RouterLink,
    RouterLinkActive,
    LoadIndicatorComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class AppComponent implements OnInit {
  userState = inject(USER_STATE);
  appState = inject(APP_STATE);
  router = inject(Router);
  links: Link[] = [
    { name: 'todos', url: 'todos' },
    { name: 'plans', url: 'plans' },
    { name: 'projects', url: 'projects' },

    { name: 'quotes', url: 'quotes' },
    { name: 'notes', url: 'notes' },
    { name: 'study questions', url: 'study' },
    { name: 'articles', url: 'articles' },
    { name: 'test results', url: 'results' },
    { name: 'exams', url: 'exams' },
    { name: 'admin', url: 'admin' },
  ];
  title = 'KISOMO';
  constructor() {
    effect(() => {
      if (!this.appState.isLoggedIn()) {
        this.router.navigate(['/login']);
      }
    });
  }
  ngOnInit(): void {
    // this.appState.setUserSession();
    if (this.appState.isLoggedIn()) {
      this.appState.initializeData().then((res) => {
        console.log('initialization in the main app....');
      });
    }
  }
  async reloadData() {
    await this.appState.getResources();
  }
  logOut() {
    this.appState.logOut();
  }
}
