import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../interfaces/quote';
import { HttpService } from '../../services/http.service';

@Component({
  selector: 'app-create-quotes',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-quotes.component.html',
  styleUrl: './create-quotes.component.scss',
})
export class CreateQuotesComponent {
  quoteService = inject(QuoteService);
  http = inject(HttpService);
  items: Quote[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    quote: ['', Validators.required],
    firstname: ['', Validators.required],
    lastname: ['', Validators.min(1)],
  });
  save() {
    this.quoteService
      .post({
        value: this.form.value.quote ?? '',
        author: `${this.form.value.firstname ?? ''} ${
          this.form.value.lastname ?? ''
        }`,
      })
      .subscribe((result) => {
        this.items.push(result);
      });
  }
  reset() {
    this.form.patchValue({
      quote: '',
    });
  }
}
