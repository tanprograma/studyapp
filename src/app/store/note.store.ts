import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';

import { inject } from '@angular/core';
import { Note } from '../interfaces/note';
import { APP_STATE } from './app.store';
import { NoteService } from '../services/note.service';
export type NotesFilter = {
  subject: string;
  topic: string;
};
type State = {
  notes: Note[];
  createdNotes: Note[];
  initialized: boolean;
  loading: boolean;
};
const initialState: State = {
  notes: [],
  createdNotes: [],
  initialized: false,
  loading: false,
};
export const NOTE_STORE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods(
    (
      store,
      noteService = inject(NoteService),
      appStore = inject(APP_STATE)
    ) => ({
      initializeStore() {
        patchState(store, { initialized: true });
      },

      async getNotes(topic: { topic: string }) {
        appStore.setLoadState(true);
        const notes = await noteService.getNotes(
          appStore.user()?._id as string,
          topic
        );
        patchState(store, { notes: notes });
        appStore.setLoadState(false);
      },
      async addNote(payload: Partial<Note>[]) {
        patchState(store, { loading: true });
        const notes = await noteService.addNote(payload);
        patchState(store, ({ createdNotes }) => ({
          createdNotes: [],
          loading: false,
        }));
      },
    })
  )
);
