import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleContent } from '../../interfaces/article';

@Component({
  selector: 'heading-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './heading-creator.component.html',
  styleUrl: './heading-creator.component.scss',
})
export class HeadingCreatorComponent {
  @Output() onCreate = new EventEmitter<ArticleContent>();
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    content: ['', Validators.required],
  });
  save() {
    this.onCreate.emit({
      format: 'heading',
      composition: { value: this.form.value.content ?? '' },
    });

    this.clearForm();
  }
  clearForm() {
    this.form.setValue({
      content: '',
    });
  }
}
