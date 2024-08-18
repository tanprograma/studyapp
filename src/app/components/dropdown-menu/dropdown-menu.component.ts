import { Component, inject, Input } from '@angular/core';
import { Link } from '../../interfaces/link';
import { RouterLink } from '@angular/router';
import { DOCUMENT, UpperCasePipe } from '@angular/common';

@Component({
  selector: 'app-dropdown-menu',
  standalone: true,
  imports: [RouterLink, UpperCasePipe],
  templateUrl: './dropdown-menu.component.html',
  styleUrl: './dropdown-menu.component.scss',
})
export class DropdownMenuComponent {
  @Input() data!: { title: string; links: Link[] };
  document = inject(DOCUMENT);
}
