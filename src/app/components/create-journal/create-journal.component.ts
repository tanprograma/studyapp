import { Component, inject } from '@angular/core';
import { JOURNAL_STORE } from '../../store/journal.store';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';
import { MatInputModule } from '@angular/material/input';
import { CreatedComponent } from '../created/created.component';
import { MatButtonModule } from '@angular/material/button';

@Component({
  selector: 'create-journal',
  standalone: true,
  imports: [
    LoadIndicatorComponent,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    MatButtonModule,
  ],
  templateUrl: './create-journal.component.html',
  styleUrl: './create-journal.component.scss',
})
export class CreateJournalComponent {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    entry: ['', Validators.required],
  });

  store = inject(JOURNAL_STORE);

  removeEntry(id: string) {
    this.store.deleteEntry(id);
  }

  async addEntry() {
    await this.store.addEntry({ title: this.form.value.entry ?? '' });
    // console.log(this.form.value.entry ?? '');
    this.clearForm();
  }

  clearForm() {
    this.form.patchValue({ entry: '' });
  }
}
