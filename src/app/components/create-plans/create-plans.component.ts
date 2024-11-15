import { Component, inject } from '@angular/core';
import { ReactiveFormsModule, FormBuilder, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';

import { CreatedComponent } from '../created/created.component';
import { PLAN_STORE } from '../../store/plan.store';
import { LoadIndicatorComponent } from '../load-indicator/load-indicator.component';

@Component({
  selector: 'create-plans',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInputModule,
    ReactiveFormsModule,
    CreatedComponent,
    LoadIndicatorComponent,
  ],
  templateUrl: './create-plans.component.html',
  styleUrl: './create-plans.component.scss',
})
export class CreatePlansComponent {
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    plan: ['', Validators.required],
  });
  store = inject(PLAN_STORE);
  async createItem() {
    if (this.form.valid) {
      await this.store.addPlan({
        title: this.form.value.plan ?? '',
      });
      this.clearForm();
    } else {
      return;
    }
  }
  clearForm() {
    this.form.patchValue({ plan: '' });
  }
  async deleteItem(id: string) {
    await this.store.deletePlan(id);
  }
}
