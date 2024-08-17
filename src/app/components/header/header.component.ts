import { Component, EventEmitter, Input, Output } from '@angular/core';
import { RouterLink } from '@angular/router';

@Component({
  selector: 'app-header',
  standalone: true,
  imports: [RouterLink],
  templateUrl: './header.component.html',
  styleUrl: './header.component.scss',
})
export class HeaderComponent {
  @Output() onToggleMenu = new EventEmitter();
  // menuIcon = faBars;
  // leftArrow = faArrowLeft;
  toggleMenu() {
    this.onToggleMenu.emit();
  }
}
