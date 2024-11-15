import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';
import { Plan } from '../interfaces/plan';
import { PlanService } from '../services/plan.service';
import { computed, inject } from '@angular/core';

type State = {
  plans: Plan[];
  filter: 'all' | 'completed' | 'pending';
  loading: boolean;
};
const initialState: State = { plans: [], filter: 'all', loading: false };
export const PLAN_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ plans, filter }) => ({
    filteredPlans: computed(() => {
      switch (filter()) {
        case 'all':
          return plans();

        case 'pending':
          return plans().filter((plan: Plan) => !plan.completed);

        case 'completed':
          return plans().filter((plan: Plan) => plan.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
    createdPlans: computed(() => {
      return plans().map((p) => ({ _id: p._id, item: p.title }));
    }),
  })),
  withMethods((store, planService = inject(PlanService)) => ({
    async getPlans(id: string) {
      const plans = await planService.getPlans(id);
      patchState(store, { plans: plans });
    },
    async addPlan(payload: Partial<Plan>) {
      patchState(store, { loading: true });
      const plan = await planService.addPlan(payload);
      patchState(store, ({ plans }) => ({
        plans: [plan, ...plans],
        loading: false,
      }));
    },
    async deletePlan(id: string) {
      patchState(store, { loading: true });
      const res = await planService.deletePlan(id);
      if (res) {
        patchState(store, ({ plans }) => ({
          plans: plans.filter((plan) => plan._id != id),
          loading: false,
        }));
      }
    },
    async updatePlan(id: string, payload: Partial<Plan>) {
      patchState(store, { loading: true });
      const res = await planService.updatePlan(id, payload);
      patchState(store, ({ plans }) => ({
        plans: plans.map((plan) => (plan._id == id ? res : plan)),
        loading: false,
      }));
    },
    filterPlans(filter: 'all' | 'pending' | 'completed') {
      patchState(store, { filter: filter });
    },
  }))
);
