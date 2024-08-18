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

  items: Quote[] = [];
  ngOnInit(): void {
    this.quoteService.get().subscribe((res) => {
      this.all_Items = this.items = res;
    });
  }
  search(e: Event) {
    const target = e.target as HTMLInputElement;
    if (target.value == '') {
      this.items = this.all_Items;
      return;
    }
    this.items = this.all_Items.filter((item) => {
      return item.author.includes(target.value.toLowerCase());
    });
  }
}
