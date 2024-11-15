import {
  patchState,
  signalStore,
  withComputed,
  withMethods,
  withState,
} from '@ngrx/signals';
import { Book } from '../interfaces/book';
import { Subject } from '../interfaces/subject';
import { Topic } from '../interfaces/topic';
import { BookService } from '../services/book.service';
import { computed, inject } from '@angular/core';
import { SubjectService } from '../services/subject.service';
import { TopicService } from '../services/topic.service';
import { LoggedUser } from './user.store';
import { UserService } from '../services/user.service';
import { User } from '../interfaces/user';
import { AppService } from '../services/app.service';
import { switchScan } from 'rxjs';

type State = {
  initialized: boolean;
  books: Book[];
  subjects: Subject[];
  subjectFilter: string;
  topics: Topic[];
  user: LoggedUser | null;
  loading: boolean;
  loggedIn: boolean;
};
const initialState: State = {
  subjectFilter: '',
  loading: false,
  initialized: false,
  books: [],
  subjects: [],
  topics: [],
  user: null,
  loggedIn: false,
};
export const APP_STATE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withComputed((store) => ({
    filteredBooks: computed(() => {
      switch (store.subjectFilter()) {
        case '':
          return [];

        default:
          return store
            .books()
            .filter((book) => book.subject == store.subjectFilter());
      }
    }),
    filteredTopics: computed(() => {
      switch (store.subjectFilter()) {
        case '':
          return [];

        default:
          return store
            .topics()
            .filter((item) => item.subject == store.subjectFilter());
      }
    }),
  })),
  withMethods(
    (
      store,
      bookService = inject(BookService),
      subjectService = inject(SubjectService),
      topicService = inject(TopicService),
      userService = inject(UserService)
    ) => ({
      setState(state: boolean) {
        patchState(store, { initialized: state });
      },
      setLoadState(v: boolean) {
        patchState(store, { loading: v });
      },
      isLoggedIn() {
        return !!userService.isLoggedIn();
      },
      setUserSession() {
        userService.setUserSession(store.user());
      },
      setSubjectFilter(subject: string) {
        patchState(store, { subjectFilter: subject });
      },
      async login(payload: Partial<User>) {
        patchState(store, { loading: true });
        const response = await userService.login(payload);

        if (response.status) {
          patchState(store, (state) => ({
            user: response.data as LoggedUser,
            loading: false,
            loggedIn: true,
          }));
          userService.setUserSession(response.data);
          return true;
        }
        return false;
      },
      logOut() {
        patchState(store, { loggedIn: false, user: null });
        userService.logOut();
      },
      async initializeData() {
        const loggedIn = !!userService.isLoggedIn();
        patchState(store, { loading: true, initialized: true });
        const [books, topics, subjects] = await Promise.all([
          bookService.getBooks(),
          topicService.getTopics(),
          subjectService.getSubjects(),
        ]);

        patchState(store, (state) => ({
          books: books,
          topics: topics,
          subjects: subjects,
          loading: false,
        }));
        if (loggedIn) {
          patchState(store, {
            loggedIn,
            user: JSON.parse(userService.isLoggedIn() as string),
          });
        } else {
          patchState(store, { loggedIn });
        }
      },
      async getResources() {
        patchState(store, { loading: true });
        const [books, topics, subjects] = await Promise.all([
          bookService.getBooks(),
          topicService.getTopics(),
          subjectService.getSubjects(),
        ]);

        patchState(store, (state) => ({
          books: books,
          topics: topics,
          subjects: subjects,
          loading: false,
        }));
      },
    })
  )
);
