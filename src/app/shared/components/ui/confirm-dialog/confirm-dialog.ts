import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { AppIcons } from '../../../../../assets/icons/icons';
import { LucideAngularModule } from "lucide-angular";
type Variant = 'success' | 'danger';

@Component({
  selector: 'app-confirm-dialog',
  standalone: true,
  imports: [CommonModule, LucideAngularModule],
  templateUrl: './confirm-dialog.html',
  styleUrls: ['./confirm-dialog.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class ConfirmDialog {
  /** Show / hide the dialog (use *ngIf in parent) */
  open = input<boolean>(false);

  icons = AppIcons;

  /** Visual style */
  variant = input<Variant>();
  /** Main message */
  text = input<string>('');

  cancelText = input<string>('Cancel');
  confirmText = input<string>('Yes');


  /** If true, clicking on backdrop does nothing */
  disableBackdropClose = false;

  /** Events */
  confirm = output<void>();
  cancel = output<void>();
  closed = output<void>();

  get accentClasses() {
    return this.variant() === 'success'
      ? {
        topBar: 'bg-[#30C26C]',
        iconRing: 'border-[#30C26C]',
        iconColor: 'text-[#30C26C]',
        confirmBtn: 'bg-[#30C26C]  text-white',
      }
      : {
        topBar: 'bg-[#F44444]',
        iconRing: 'border-[#F44444]',
        iconColor: 'text-[#F44444]',
        confirmBtn: 'bg-[#F44444] ',
      };
  }

  onBackdropClick() {
    if (!this.disableBackdropClose) {
      this.onCancel();
    }
  }

  onCancel() {

    this.cancel.emit();
    this.closed.emit();
  }

  onConfirm() {
    this.confirm.emit();

  }

}
