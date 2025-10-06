import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../assets/icons/icons';

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
  imports: [CommonModule, LucideAngularModule],
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
icons = AppIcons;
  modelContainerClass= input<string>('');
  modalBodyClass = input<string>('');

  /**
   * An output event that emits when the modal is closed.
   */
  closed = output<void>();
  save = output<void>();

 /** ✅ Customizable button text */
  saveButtonText = input<string>('Save');
  cancelButtonText = input<string>('Cancel');

   saveButtonClass = input<string>(
    'flex items-center justify-center gap-2 min-w-[98px] px-4 py-2 text-white bg-[#6D7BFA] rounded'
  );

  cancelButtonClass = input<string>(
    'flex items-center justify-center min-w-[98px] gap-2 px-4 py-2 border border-[#7E7A88] text-[16px] font-bold text-[#7E7A88] bg-transparent rounded-lg'
  );

  footerClases = input<string>('')

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
