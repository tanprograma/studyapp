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
import { MCQ } from '../../interfaces/mcq';
import { FormBuilder } from '@angular/forms';

@Component({
  selector: 'mcq-res',
  standalone: true,
  imports: [],
  templateUrl: './mcq-res.component.html',
  styleUrl: './mcq-res.component.scss',
})
export class McqResComponent implements OnInit {
  @Input() qn!: MCQ;
  @Input() marked!: boolean;

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
}
