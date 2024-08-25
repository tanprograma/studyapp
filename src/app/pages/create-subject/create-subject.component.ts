import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '../../interfaces/subject';
import { HttpService } from '../../services/http.service';
import { SubjectService } from '../../services/subject.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [ReactiveFormsModule, LoaderComponent, PromptConfirmComponent],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss',
})
export class CreateSubjectComponent {
  loading = false;
  subjectService = inject(SubjectService);
  http = inject(HttpService);
  items: Subject[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
  });
  save() {
    this.loading = true;
    this.subjectService
      .post({ name: this.form.value.subject ?? '' })
      .subscribe((result) => {
        if (result != undefined) {
          this.items.push(result);
        }
        this.loading = false;
      });
  }
  reset() {
    this.form.patchValue({
      subject: '',
    });
  }
}
