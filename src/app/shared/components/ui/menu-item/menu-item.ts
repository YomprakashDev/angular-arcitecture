import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

@Component({
  selector: 'app-menu-item',
  templateUrl: './menu-item.html',
  styleUrls: ['./menu-item.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class MenuItemComponent {
  item = input.required<{ name: string }>();
  isSelected = input(false);
  itemSelected = output<string>();

  onSelect() {
    this.itemSelected.emit(this.item().name);
  }
}
