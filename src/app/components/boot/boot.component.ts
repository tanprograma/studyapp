import { Component, inject } from '@angular/core';
import { APP_STATE } from '../../store/app.store';
import { Router } from '@angular/router';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'boot',
  standalone: true,
  imports: [MatProgressSpinnerModule, LoadIndicatorComponent],
  templateUrl: './boot.component.html',
  styleUrl: './boot.component.scss',
})
export class BootComponent {
  appState = inject(APP_STATE);
  message = 'loading resources';
  router = inject(Router);
  constructor() {}
  ngOnInit(): void {
    this.getResources().then(() => {
      console.log('data initialized');

      this.router.navigate(['/admin']);
    });
  }
  async getResources() {
    this.appState.setState(true);
    await this.appState.initializeData();
  }
}
