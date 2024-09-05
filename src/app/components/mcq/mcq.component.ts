import {
  Component,
  computed,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
  signal,
} from '@angular/core';
import { FormBuilder, ReactiveFormsModule } from '@angular/forms';
import { MCQ } from '../../interfaces/mcq';

@Component({
  selector: 'mcq',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './mcq.component.html',
  styleUrl: './mcq.component.scss',
})
export class McqComponent implements OnInit {
  @Input() qn!: MCQ;

  @Output() onSelect = new EventEmitter<{
    qn: number;
    option: string;
    type: string;
    state: boolean;
  }>();
  form = inject(FormBuilder);
  all = false;
  options: any[] = [];
  optionsExtra: any[] = [];
  ngOnInit(): void {
    this.options = this.qn.options.filter((l, index) => {
      return index <= 4;
    });
    this.optionsExtra = this.qn.options.filter((l, index) => {
      return index > 4;
    });
  }
  toggleOptions() {
    this.all = this.all ? false : true;
  }
  select(e: Event) {
    const target = e.target as HTMLInputElement;
    this.options = this.options.map((item) =>
      item.option.toLowerCase == target.value
        ? { ...item, selected: true }
        : item
    );
    this.onSelect.emit({
      qn: this.qn.qn,
      option: target.value,
      type: this.qn.type,
      state: target.checked,
    });
  }
  selectXtra(e: Event) {
    const target = e.target as HTMLInputElement;
    this.optionsExtra = this.optionsExtra.map((item) =>
      item.option.toLowerCase == target.value
        ? { ...item, selected: true }
        : item
    );
    this.onSelect.emit({
      qn: this.qn.qn,
      option: target.value,
      type: this.qn.type,
      state: target.checked,
    });
  }
}
