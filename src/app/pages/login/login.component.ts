import { Component, effect, inject } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInput } from '@angular/material/input';
// import { USER_STATE } from '../../store/user.store';
import { User } from '../../interfaces/user';
import { MatButtonModule } from '@angular/material/button';
import { MatProgressSpinnerModule } from '@angular/material/progress-spinner';
import { BOOK_STORE } from '../../store/book.store';
import { SUBJECT_STORE } from '../../store/subject.store';
import { TODO_STORE } from '../../store/todo.store';
import { TOPIC_STORE } from '../../store/topic.store';
import { Router } from '@angular/router';
import { MatIconModule } from '@angular/material/icon';
import { APP_STATE } from '../../store/app.store';

@Component({
  selector: 'app-login',
  standalone: true,
  imports: [
    MatFormFieldModule,
    MatInput,
    ReactiveFormsModule,
    MatButtonModule,
    MatProgressSpinnerModule,
    MatIconModule,
  ],
  templateUrl: './login.component.html',
  styleUrl: './login.component.scss',
})
export class LoginComponent {
  // appStore = inject(APP_STATE);
  // router = inject(Router);
  // formBuilder = inject(FormBuilder);
  // form = this.formBuilder.group({
  //   username: ['', Validators.required],
  //   password: ['', Validators.required],
  // });
  // async login() {
  //   const status = await this.appStore.login(this.prepareUser());
  //   if (status) {
  //     this.router.navigate(['/boot']);
  //   }
  // }
  // prepareUser(): Partial<User> {
  //   return {
  //     username: this.form.value.username ?? '',
  //     password: this.form.value.password ?? '',
  //   };
  // }
  // showPassword: boolean = false;
  // toggleVisibility(e: MouseEvent) {
  //   e.stopPropagation();
  //   this.showPassword = !this.showPassword;
  // }
}
