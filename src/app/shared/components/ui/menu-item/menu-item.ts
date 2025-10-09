import {
  ChangeDetectionStrategy,
  Component,
  input,
  output,
} from '@angular/core';
import { LucideAngularModule } from 'lucide-angular';
import { AppIcons } from '../../../../../assets/icons/icons';

// Input model for the menu row
type MenuItem = Readonly<{ id: number; name: string; enabled?: boolean }>;

@Component({
  standalone: true,
  selector: 'app-menu-item',
  imports: [LucideAngularModule],
  templateUrl: './menu-item.html',
  styleUrls: ['./menu-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush, 
})
export class MenuItemComponent {
  // inputs/outputs
  item = input.required<MenuItem>();
  isSelected = input(false);
  itemSelected = output<number>(); 

  // icons 
  icons = AppIcons;

  // click
  onSelect(): void {
  
    this.itemSelected.emit(this.item().id);
  }
}
