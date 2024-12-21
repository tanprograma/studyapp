import { Component, computed, inject, signal } from '@angular/core';
import { NOTE_STORE } from '../../store/note.store';
import { APP_STATE } from '../../store/app.store';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatIconModule } from '@angular/material/icon';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { Note } from '../../interfaces/note';
import { CreatedComponent } from '../created/created.component';
import { QuestionsListComponent } from '../questions-list/questions-list.component';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-notes',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,

    MatButtonModule,
    MatIconModule,
    MatSelectModule,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-notes.component.html',
  styleUrl: './create-notes.component.scss',
})
export class CreateNotesComponent {
  formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    subject: ['', Validators.required],
    note: ['', Validators.required],
    topic: ['', Validators.required],
  });
  appStore = inject(APP_STATE);
  store = inject(NOTE_STORE);
  notes: { item: string; _id: string }[] = [];

  setSubject(v: string) {
    this.appStore.setSubjectFilter(v);
  }
  removeNote(id: string) {
    this.notes = this.notes.filter((note) => note._id != id);
  }
  createNote() {
    this.notes.push({
      item: this.form.value.note ?? '',
      _id: Math.random().toString(36).substring(2, 9),
    });
    this.clearForm();
  }

  async addNotes() {
    await this.store.addNote(this.prepareNotes());
    this.notes = [];
  }
  prepareNotes(): Partial<Note>[] {
    return this.notes.map((note) => ({
      subject: this.form.value.subject ?? '',
      title: note.item ?? '',
      topic: this.form.value.topic ?? '',
      // author: '',
    }));
  }
  clearForm() {
    this.form.patchValue({ note: '' });
  }
}
