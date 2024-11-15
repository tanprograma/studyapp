import { Component, computed, inject, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelect, MatSelectModule } from '@angular/material/select';
import { APP_STATE } from '../../store/app.store';
import { Note } from '../../interfaces/note';
import { NOTE_STORE } from '../../store/note.store';
import { MatIconModule } from '@angular/material/icon';

@Component({
  selector: 'app-notes',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    MatSelectModule,
    MatIconModule,
  ],
  templateUrl: './notes.component.html',
  styleUrl: './notes.component.scss',
})
export class NotesComponent {
  formBuilder = inject(FormBuilder);
  appState = inject(APP_STATE);
  store = inject(NOTE_STORE);
  subject = signal('string');

  form = this.formBuilder.group({
    topic: ['', Validators.required],
  });
  setSubject(v: string) {
    this.subject.set(v);
  }
  async getNotes() {
    await this.store.getNotes({ topic: this.form.value.topic ?? '' });
  }
}
