import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatButtonModule } from '@angular/material/button';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { CreatedComponent } from '../created/created.component';
import { SUBJECT_STORE } from '../../store/subject.store';
import { APP_STATE } from '../../store/app.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-subjects',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    MatButtonModule,
    ReactiveFormsModule,
    CreatedComponent,
    MatSelectModule,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-subjects.component.html',
  styleUrl: './create-subjects.component.scss',
})
export class CreateSubjectsComponent {
  formBuilder = inject(FormBuilder);
  subjectForm = this.formBuilder.group({
    subject: ['', Validators.required],
  });
  appStore = inject(APP_STATE);
  store = inject(SUBJECT_STORE);
  async createSubject() {
    if (this.subjectForm.valid) {
      await this.store.addSubject({
        name: this.subjectForm.value.subject ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.subjectForm.patchValue({ subject: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteSubject(id);
  }
}
