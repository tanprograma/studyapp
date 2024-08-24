import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleContent } from '../../interfaces/article';

@Component({
  selector: 'paragraph-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './paragraph-creator.component.html',
  styleUrl: './paragraph-creator.component.scss',
})
export class ParagraphCreatorComponent {
  @Output() onCreate = new EventEmitter<ArticleContent>();
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    content: ['', Validators.required],
  });
  save() {
    this.onCreate.emit({
      format: 'paragraph',
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
