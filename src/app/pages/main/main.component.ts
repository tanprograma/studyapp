import { Component } from '@angular/core';
import { HeaderComponent } from '../../components/header/header.component';
import { RouterOutlet } from '@angular/router';
import { MainMenuComponent } from '../../components/main-menu/main-menu.component';

@Component({
  selector: 'app-main',
  standalone: true,
  imports: [RouterOutlet, HeaderComponent, MainMenuComponent],
  templateUrl: './main.component.html',
  styleUrl: './main.component.scss',
})
export class MainComponent {
  open: boolean = true;
  toggleMenu() {
    console.log('menu toggled');
    this.open = !this.open;
  }
  createDate = '2024';
  currentDate = new Date().getFullYear();
}
