import {  Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-menu-item',
  templateUrl: './menu-item.html',
  styleUrls: ['./menu-item.css'],
})
export class MenuItemComponent {
  item = input.required<{ name: string ,id:number}>();
  isSelected = input(false);
  itemSelected = output<number>();

  onSelect() {
    this.itemSelected.emit(this.item().id);
  }
}
