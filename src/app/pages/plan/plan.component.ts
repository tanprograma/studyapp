import { Component, inject, OnInit } from '@angular/core';
import { Plan } from '../../interfaces/plan';
import { PlanService } from '../../services/plan.service';
import { LoaderComponent } from '../../components/loader/loader.component';
import { PromptConfirmComponent } from '../../components/prompt-confirm/prompt-confirm.component';

@Component({
  selector: 'app-plan',
  standalone: true,
  imports: [PromptConfirmComponent],
  templateUrl: './plan.component.html',
  styleUrl: './plan.component.scss',
})
export class PlanComponent implements OnInit {
  planService = inject(PlanService);
  all_Items: Plan[] = [];
  loading = true;

  items: Plan[] = [];
  ngOnInit(): void {
    this.loading = true;
    this.planService.get().subscribe((res) => {
      this.all_Items = this.items = res;
      this.loading = false;
    });
  }
  search(e: Event) {
    const target = e.target as HTMLInputElement;

    this.items = this.all_Items.filter((item) => {
      return (
        new Date(item.createdAt as string).toLocaleDateString() ==
        new Date(target.value).toLocaleDateString()
      );
    });
  }
  getAll() {
    this.items = this.all_Items;
  }
  complete(id: string | undefined) {
    this.planService.complete({ _id: id as string }).subscribe((res) => {
      this.items = this.items.map((item) => {
        return item._id == res._id ? { ...item, completed: true } : item;
      });
    });
  }
}
