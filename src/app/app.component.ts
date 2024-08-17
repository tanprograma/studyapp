import { Component, inject, OnInit, AfterViewInit } from '@angular/core';
import { ActivatedRoute, RouterOutlet } from '@angular/router';
import { StoreService } from './services/store.service';
import { UrlService } from './services/url.service';
import { DOCUMENT } from '@angular/common';
import { environment } from '../environments/environment';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent implements OnInit {
  document = inject(DOCUMENT);
  storeService = inject(UrlService);
  // route=inject(ActivatedRoute)
  title = 'studyapp';
  ngOnInit(): void {
    // this.setAPI_URL();
  }
}
