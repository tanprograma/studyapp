import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';

import { computed, inject } from '@angular/core';

import { Journal } from '../interfaces/journal';
import { JournalService } from '../services/journal.service';

type State = {
  journal: Journal[];
  loading: boolean;
};
const initialState: State = {
  journal: [],
  loading: false,
};
export const JOURNAL_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    createdEntries: computed(() => {
      return store
        .journal()
        .filter((entry) => {
          return (
            new Date(entry.createdAt).toLocaleDateString() ==
            new Date().toLocaleDateString()
          );
        })
        .map((entry) => ({ _id: entry._id, item: entry.title }));
    }),
  })),
  withMethods((store, journalService = inject(JournalService)) => ({
    async getJournal() {
      const journal = await journalService.getJournal();
      patchState(store, { journal: journal });
    },

    async addEntry(payload: Partial<Journal>) {
      patchState(store, { loading: true });
      const entry = await journalService.addEntry(payload);
      patchState(store, ({ journal }) => ({
        journal: [entry, ...journal],
        loading: false,
      }));
    },
    async deleteEntry(id: string) {
      patchState(store, { loading: true });
      const res = await journalService.deleteEntry(id);
      if (res) {
        patchState(store, ({ journal }) => ({
          journal: journal.filter((item) => item._id != id),
          loading: false,
        }));
      }
      patchState(store, { loading: false });
    },
  }))
);
