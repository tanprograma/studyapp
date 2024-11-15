import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { CreatedComponent } from '../created/created.component';
import { MatButtonModule } from '@angular/material/button';
import { QUOTE_STATE } from '../../store/quote.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-quotes',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    MatButtonModule,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-quotes.component.html',
  styleUrl: './create-quotes.component.scss',
})
export class CreateQuotesComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    author: [''],
    quote: ['', Validators.required],
  });
  store = inject(QUOTE_STATE);
  async createItem() {
    if (this.form.valid) {
      await this.store.createQuote({
        title: this.form.value.quote ?? '',
        author: this.form.value.author ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ quote: '', author: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteQuote(id);
  }
}
