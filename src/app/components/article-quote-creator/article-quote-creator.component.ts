import { Component, EventEmitter, inject, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleContent } from '../../interfaces/article';

@Component({
  selector: 'article-quote-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './article-quote-creator.component.html',
  styleUrl: './article-quote-creator.component.scss',
})
export class ArticleQuoteCreatorComponent {
  @Output() onCreate = new EventEmitter<ArticleContent>();
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    quote: ['', Validators.required],
    attribute: [''],
  });
  save() {
    this.onCreate.emit({
      format: 'quote',
      composition: {
        value: this.form.value.quote ?? '',
        attribute: this.form.value.attribute ?? '',
      },
    });

    this.clearForm();
  }
  clearForm() {
    this.form.setValue({
      quote: '',
      attribute: '',
    });
  }
}
