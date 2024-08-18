import { DOCUMENT } from '@angular/common';
import { Component, EventEmitter, inject, Input, Output } from '@angular/core';
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
  document = inject(DOCUMENT);
  toggleMenu() {
    this.onToggleMenu.emit();
  }
}
