import { inject, Injectable } from '@angular/core';
import { Project } from '../interfaces/project';
import { UrlService } from './url.service';
@Injectable({
  providedIn: 'root',
})
export class ProjectService {
  private $axios = inject(UrlService).$axios;
  constructor() {}
  async getProjects() {
    const res = await this.$axios.get(`/projects`);
    return res.data;
  }
  async addProject(project: Partial<Project>): Promise<Project> {
    const req = await this.$axios.post('/projects', project);
    return req.data;
  }
  async deleteProject(id: string) {
    const req = await this.$axios.delete(`/projects/${id}`);
    return req.data;
  }
  async updateProject(id: string, payload: Partial<Project>) {
    const req = await this.$axios.put(`/projects/${id}`, payload);
    return req.data;
  }
  async toggleProject(id: string) {
    const req = await this.$axios.patch(`/projects/${id}`);
    return req.data;
  }
}
