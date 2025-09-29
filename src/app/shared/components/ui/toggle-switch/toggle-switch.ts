import { CommonModule } from '@angular/common';
import { Component, input, output } from '@angular/core';

@Component({
  standalone: true,
  selector: 'app-toggle-switch',
  imports: [CommonModule],
  templateUrl: './toggle-switch.html',
  styleUrls: ['./toggle-switch.css']
})
export class ToggleSwitch {

  // Input for the initial state of the switch (e.g., module.status)
  isChecked = input<boolean>(false);

  // Optinal right now -Input for a unique identifier/label (if needed in the future)
  label = input<string>('');

  // Output event that emits the new state when the switch changes
  stateChange = output<boolean>();

  /**
   * Handles the change event from the checkbox and emits the new state.
   * @param event The DOM change event, which contains the new checked state.
   */
  onToggle(event: Event): void {
    const inputElement = event.target as HTMLInputElement;

    this.stateChange.emit(inputElement.checked);

  }
}
