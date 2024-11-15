import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreatedComponent } from '../created/created.component';
import { PROJECT_STORE } from '../../store/project.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-projects',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-projects.component.html',
  styleUrl: './create-projects.component.scss',
})
export class CreateProjectsComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    project: ['', Validators.required],
  });
  store = inject(PROJECT_STORE);
  async createItem() {
    if (this.form.valid) {
      await this.store.addProject({
        title: this.form.value.project ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ project: '' });
  }
  async deleteItem(id: string) {
    await this.store.deleteProject(id);
  }
}
