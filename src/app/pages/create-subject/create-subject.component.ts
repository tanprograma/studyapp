import { Component, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { Subject } from '../../interfaces/subject';
import { HttpService } from '../../services/http.service';
import { SubjectService } from '../../services/subject.service';

@Component({
  selector: 'app-create-subject',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './create-subject.component.html',
  styleUrl: './create-subject.component.scss',
})
export class CreateSubjectComponent {
  subjectService = inject(SubjectService);
  http = inject(HttpService);
  items: Subject[] = [];
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    subject: ['', Validators.required],
  });
  save() {
    this.subjectService
      .post({ name: this.form.value.subject ?? '' })
      .subscribe((result) => {
        this.items.push(result);
      });
  }
  reset() {
    this.form.patchValue({
      subject: '',
    });
  }
}
