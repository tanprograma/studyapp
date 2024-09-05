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
import { FormBuilder } from '@angular/forms';
import { MCQ } from '../../interfaces/mcq';

@Component({
  selector: 'mcq-marking',
  standalone: true,
  imports: [],
  templateUrl: './mcq-marking.component.html',
  styleUrl: './mcq-marking.component.scss',
})
export class McqMarkingComponent implements OnInit {
  @Input() qn!: MCQ;
  @Input() marked!: boolean;
  @Output() onSelect = new EventEmitter<{
    qn: number;
    option: string;
    type: string;
    state: boolean;
  }>();
  form = inject(FormBuilder);
  all = false;
  options: any[] = [];
  ngOnInit(): void {
    this.options = this.qn.options.filter((l, index) => {
      return index <= 4;
    });
  }
  toggleOptions() {
    this.all = this.all ? false : true;
    if (this.all) {
      this.options = this.qn.options;
      return;
    }
    this.options = this.qn.options.filter((l, index) => {
      return index <= 4;
    });
  }
  select(e: Event) {
    const target = e.target as HTMLInputElement;
    this.onSelect.emit({
      qn: this.qn.qn,
      option: target.value,
      type: this.qn.type,
      state: target.checked,
    });
  }
}
