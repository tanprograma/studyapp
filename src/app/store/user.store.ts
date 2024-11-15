import { patchState, signalStore, withMethods, withState } from '@ngrx/signals';
import { User } from '../interfaces/user';
import { UserService } from '../services/user.service';
import { inject } from '@angular/core';
export type LoggedUser = Pick<User, '_id' | 'surname' | 'firstname'>;
type State = {
  user: LoggedUser | null;
};
const initialState: State = {
  user: {
    _id: '673330056dcfd10bc851de39',
    firstname: 'kija',
    surname: 'mnada',
  },
};
export const USER_STATE = signalStore(
  { providedIn: 'root' },
  withState(initialState),
  withMethods((store, userService = inject(UserService)) => ({
    async login(payload: Partial<User>) {
      const response = await userService.login(payload);

      if (response.status) {
        patchState(store, ({ user }) => ({
          user: response.data as LoggedUser,
        }));
      }
    },
  }))
);
