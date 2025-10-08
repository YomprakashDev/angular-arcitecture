import { Component, input, output } from '@angular/core';
import { AppIcons } from '../../../../../assets/icons/icons';
import { LucideAngularModule } from "lucide-angular";

@Component({
  standalone: true,
  selector: 'app-menu-item',
  imports: [LucideAngularModule],
  templateUrl: './menu-item.html',
  styleUrls: ['./menu-item.css'],
})
export class MenuItemComponent {
  item = input.required<{ name: string, id: number }>();
  isSelected = input(false);
  itemSelected = output<number>();

  icons = AppIcons;

  onSelect() {
    this.itemSelected.emit(this.item().id);
  }
}
