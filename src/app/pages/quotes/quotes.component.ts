import {
  Component,
  computed,
  inject,
  OnInit,
  Signal,
  signal,
} from '@angular/core';
import { Quote } from '../../interfaces/quote';
import { QuoteService } from '../../services/quote.service';
import { ReactiveFormsModule } from '@angular/forms';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {
  quoteService = inject(QuoteService);
  all_Items: Quote[] = [];
  searchTerm = signal<string>('');
  items!: Signal<Quote[]>;
  ngOnInit(): void {
    this.quoteService.get().subscribe((res) => {
      this.all_Items = res;
      this.items = computed(() => {
        if (this.searchTerm() == '') return this.all_Items;
        return this.all_Items.filter((quote) =>
          quote.author.includes(this.searchTerm().toLowerCase())
        );
      });
    });
  }
  search(e: Event) {
    const target = e.target as HTMLInputElement;
    this.searchTerm.set(target.value);
  }
}
