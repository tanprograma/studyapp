import { inject, Injectable } from '@angular/core';
import { Plan } from '../interfaces/plan';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class PlanService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getPlans() {
    const res = await this.$axios.get(`/plans`);
    return res.data;
  }
  async addPlan(plan: Partial<Plan>): Promise<Plan> {
    const req = await this.$axios.post('/plans', plan);
    return req.data;
  }
  async deletePlan(id: string) {
    const req = await this.$axios.delete(`/plans/${id}`);
    return req.data;
  }
  async updatePlan(id: string, payload: Partial<Plan>) {
    const req = await this.$axios.put(`/plans/${id}`, payload);
    return req.data;
  }
  async togglePlan(id: string) {
    const req = await this.$axios.patch(`/plans/${id}`);
    return req.data;
  }
}
