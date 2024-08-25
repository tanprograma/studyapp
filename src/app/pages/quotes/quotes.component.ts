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
import { LoaderComponent } from '../../components/loader/loader.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-quotes',
  standalone: true,
  imports: [PromptConfirmComponent],
  templateUrl: './quotes.component.html',
  styleUrl: './quotes.component.scss',
})
export class QuotesComponent implements OnInit {
  quoteService = inject(QuoteService);
  all_Items: Quote[] = [];
  loading = false;
  items: Quote[] = [];
  ngOnInit(): void {
    this.loading = true;
    this.quoteService.get().subscribe((res) => {
      this.all_Items = this.items = res;
      this.loading = false;
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
