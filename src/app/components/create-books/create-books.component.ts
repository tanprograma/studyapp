import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';

import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreatedComponent } from '../created/created.component';
import { BOOK_STORE } from '../../store/book.store';
import { SUBJECT_STORE } from '../../store/subject.store';
import { MatIconModule } from '@angular/material/icon';
import { APP_STATE } from '../../store/app.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'create-books',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    ReactiveFormsModule,
    CreatedComponent,
    MatIconModule,
    LoadIndicatorComponent,
    MatButtonModule,
  ],
  templateUrl: './create-books.component.html',
  styleUrl: './create-books.component.scss',
})
export class CreateBooksComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
    book: ['', Validators.required],
  });
  appStore = inject(APP_STATE);
  store = inject(BOOK_STORE);

  async createBook() {
    if (this.form.valid) {
      await this.store.addBook({
        name: this.form.value.book ?? '',
        subject: this.form.value.subject ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ book: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteBook(id);
  }
}
