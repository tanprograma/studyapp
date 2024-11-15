import {
  patchState,
  signalStore,
  withMethods,
  withState,
  withComputed,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';
import { Project } from '../interfaces/project';
import { ProjectService } from '../services/project.service';

type State = {
  projects: Project[];
  filter: 'all' | 'completed' | 'pending';
  loading: boolean;
};
const initialState: State = { projects: [], filter: 'all', loading: false };
export const PROJECT_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed(({ projects, filter }) => ({
    filteredProjects: computed(() => {
      switch (filter()) {
        case 'all':
          return projects();

        case 'pending':
          return projects().filter((project: Project) => !project.completed);

        case 'completed':
          return projects().filter((project: Project) => project.completed);

        default:
          throw new Error('unknown filter');
      }
    }),
    createdProjects: computed(() => {
      return projects().map((p) => ({ _id: p._id, item: p.title }));
    }),
  })),
  withMethods((store, projectService = inject(ProjectService)) => ({
    async getProjects(id: string) {
      const projects = await projectService.getProjects(id);
      patchState(store, { projects: projects });
    },
    async addProject(payload: Partial<Project>) {
      patchState(store, { loading: true });
      const project = await projectService.addProject(payload);
      patchState(store, ({ projects }) => ({
        projects: [project, ...projects],
        loading: false,
      }));
    },
    async deleteProject(id: string) {
      patchState(store, { loading: true });
      const res = await projectService.deleteProject(id);
      if (res) {
        patchState(store, ({ projects }) => ({
          projects: projects.filter((project) => project._id != id),
          loading: false,
        }));
      }
    },
    async updateProject(id: string, payload: Partial<Project>) {
      patchState(store, { loading: true });
      const res = await projectService.updateProject(id, payload);
      patchState(store, ({ projects }) => ({
        projects: projects.map((project) =>
          project._id == id ? res : project
        ),
        loading: false,
      }));
    },
    filterProjects(filter: 'all' | 'pending' | 'completed') {
      patchState(store, { filter: filter });
    },
  }))
);
