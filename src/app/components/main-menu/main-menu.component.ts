import {
  Component,
  EventEmitter,
  inject,
  Input,
  OnInit,
  Output,
} from '@angular/core';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { DropdownMenuComponent } from '../dropdown-menu/dropdown-menu.component';

@Component({
  selector: 'app-main-menu',
  standalone: true,
  imports: [FontAwesomeModule, DropdownMenuComponent],
  templateUrl: './main-menu.component.html',
  styleUrl: './main-menu.component.scss',
})
export class MainMenuComponent {
  @Output() onToggleMenu = new EventEmitter();
  @Input() open!: boolean;

  // menuIcon = faBars;
  // leftArrow = faArrowLeft;
  toggleMenu() {
    this.onToggleMenu.emit();
  }
  // document=inject(DOCUMENT)
  arrowLeft = faArrowLeft;
  createLinks = {
    title: 'create',
    links: [
      {
        name: 'subject',
        url: '/create-subjects',
      },
      {
        name: 'topic',
        url: '/create-topics',
      },
      {
        name: 'subtopic',
        url: '/create-subtopics',
      },
      {
        name: 'note',
        url: '/create-notes',
      },
      {
        name: 'question',
        url: '/create-questions',
      },
      {
        name: 'quote',
        url: '/create-quotes',
      },
      {
        name: 'todo',
        url: '/create-todos',
      },
    ],
  };
}
