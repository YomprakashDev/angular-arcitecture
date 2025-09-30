import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';

type ButtonVariant = 'primary' | 'secondary' | 'danger';

/**
 * A reusable button component with different visual styles.
 */
@Component({
  selector: 'app-button',
  templateUrl: './button.html',
  styleUrls: ['./button.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class Button {
  /**
   * The text to display inside the button.
   */
  text = input.required<string>();
  /**
   * The visual style of the button.
   */
  variant = input<ButtonVariant>('primary');
  /**
   * The type of the button (e.g., 'button', 'submit').
   */
  type = input<'button' | 'submit' | 'reset'>('button');
  /**
   * Whether the button is disabled.
   */
  disabled = input<boolean>(false);

  customClass = input<string>('');

  /**
   * An output event that emits when the button is clicked.
   */
  clicked = output<void>();

  /**
   * Emits the `clicked` event when the button is clicked.
   */
  onClick() {
    this.clicked.emit();
  }
}
