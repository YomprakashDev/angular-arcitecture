import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

/**
 * A reusable modal dialog component.
 * It can be opened or closed using the `isOpen` input property.
 * It emits a `closed` event when the user clicks the close button.
 */
@Component({
  standalone: true,
  selector: 'app-modal',
  templateUrl: './modal.html',
  styleUrls: ['./modal.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
  imports: [CommonModule],
})
export class Modal {
  /**
   * Controls whether the modal is open or closed.
   */
  isOpen = input.required<boolean>();
  /**
   * The title of the modal.
   */
  title = input<string>('Modal');

  /**
   * An output event that emits when the modal is closed.
   */
  closed = output<void>();
  save = output<void>();

  /**
   * Emits the `closed` event.
   */
  closeModal() {
    this.closed.emit();
  }

  isButtonsShowing = input<boolean>(true);

  onSave() {
    this.save.emit();
  }

}
