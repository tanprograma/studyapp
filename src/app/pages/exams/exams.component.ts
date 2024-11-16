import { Component, inject, OnInit } from '@angular/core';
import { Exam } from '../../interfaces/exam';
import { RouterLink } from '@angular/router';
import { MatButtonModule } from '@angular/material/button';
import { EXAM_STORE } from '../../store/exam.store';
import { ReloaderComponent } from '../../components/reloader/reloader.component';
import { APP_STATE } from '../../store/app.store';
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';

@Component({
  selector: 'exams',
  standalone: true,
  imports: [
    RouterLink,
    MatButtonModule,
    ReloaderComponent,
    LoadIndicatorComponent,
  ],
  templateUrl: './exams.component.html',
  styleUrl: './exams.component.scss',
})
export class ExamsComponent implements OnInit {
  store = inject(EXAM_STORE);
  appStore = inject(APP_STATE);
  ngOnInit(): void {
    this.getExamPreview().then((res) => console.log('fetched Exams'));
  }

  async getExamPreview() {
    await this.store.getExamPreviews();
  }
}
