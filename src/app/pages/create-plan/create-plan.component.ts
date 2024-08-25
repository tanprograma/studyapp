import { Component, inject } from '@angular/core';
import { PlanService } from '../../services/plan.service';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Plan } from '../../interfaces/plan';
import { HttpService } from '../../services/http.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-create-plan',
  standalone: true,
  imports: [ReactiveFormsModule, PromptConfirmComponent],
  templateUrl: './create-plan.component.html',
  styleUrl: './create-plan.component.scss',
})
export class CreatePlanComponent {
  planService = inject(PlanService);
  http = inject(HttpService);
  items: Plan[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    plan: ['', Validators.required],
  });
  loading = false;
  save() {
    this.loading = true;
    this.planService
      .post({
        value: this.form.value.plan ?? '',
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
      plan: '',
    });
  }
}
