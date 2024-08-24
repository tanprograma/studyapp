import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { ArticleContent } from '../../interfaces/article';

@Component({
  selector: 'list-creator',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './list-creator.component.html',
  styleUrl: './list-creator.component.scss',
})
export class ListCreatorComponent {
  @Input() ordered!: boolean;
  @Output() onCreate = new EventEmitter<ArticleContent>();
  formBuilder = inject(FormBuilder);
  form = this.formBuilder.group({
    content: ['', Validators.required],
  });
  values: { value: string }[] = [];
  save() {
    this.onCreate.emit({
      format: this.ordered ? 'olist' : 'ulist',
      composition: { values: this.values },
    });

    this.values = [];
  }
  add() {
    this.values.push({ value: this.form.value.content ?? '' });
    this.clearForm();
  }
  clearForm() {
    this.form.setValue({
      content: '',
    });
  }
}
