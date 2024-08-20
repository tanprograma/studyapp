import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { QuoteService } from '../../services/quote.service';
import { Quote } from '../../interfaces/quote';
import { HttpService } from '../../services/http.service';
import { LoaderComponent } from '../../components/loader/loader.component';

@Component({
  selector: 'app-create-quotes',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent],
  templateUrl: './create-quotes.component.html',
  styleUrl: './create-quotes.component.scss',
})
export class CreateQuotesComponent {
  loading = false;
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
    this.loading = true;
    this.quoteService
      .post({
        value: this.form.value.quote ?? '',
        author: `${this.form.value.firstname ?? ''} ${
          this.form.value.lastname ?? ''
        }`,
      })
      .subscribe((result) => {
        if (result != undefined) {
          this.items.push(result);
        }

        this.loading = false;
      });
    this.reset();
  }
  reset() {
    this.form.patchValue({
      quote: '',
    });
  }
}
