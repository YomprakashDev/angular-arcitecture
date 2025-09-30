import { Component, HostListener, signal } from '@angular/core';
import { RouterLink } from '@angular/router';
import { LucideAngularModule,   } from 'lucide-angular';
import { AppIcons } from '../../../../assets/icons/icons';

@Component({
  selector: 'app-header',
  imports: [RouterLink, LucideAngularModule],
  templateUrl: './header.html',
  styleUrl: './header.css'
})
export class Header {

 icons = AppIcons
  

   showProfileMenu = signal(false);

  // Toggle the profile menu on click
  toggleProfileMenu() {
    this.showProfileMenu.set(!this.showProfileMenu());
  }

  // HostListener to close the menu when clicking anywhere on the document
  @HostListener('document:click', ['$event'])
  onClick(event: MouseEvent) {
    const target = event.target as HTMLElement;
    // Check if the click is outside the profile menu and the profile button
    if (!target.closest('.relative')) {
      this.showProfileMenu.set(false);
    }
  }
  
}
