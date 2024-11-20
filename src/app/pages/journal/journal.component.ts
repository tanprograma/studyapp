import { Component, inject, OnInit } from '@angular/core';
import { JOURNAL_STORE } from '../../store/journal.store';
import { LoadIndicatorComponent } from '../../components/load-indicator/load-indicator.component';

@Component({
  selector: 'journal',
  standalone: true,
  imports: [LoadIndicatorComponent],
  templateUrl: './journal.component.html',
  styleUrl: './journal.component.scss',
})
export class JournalComponent implements OnInit {
  store = inject(JOURNAL_STORE);
  ngOnInit(): void {
    this.getEntries().then(() => console.log('fetched journal entries'));
  }
  async getEntries() {
    await this.store.getJournal();
  }
  renderDate(date: string) {
    const d = new Date(date);
    return `${d.getDate()}-${
      d.getMonth() + 1
    }-${d.getFullYear()}   ${d.toLocaleTimeString()}`;
  }
}
