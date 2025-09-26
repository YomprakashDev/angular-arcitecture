import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-package-information',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-package-information.html',
  styleUrls: ['./add-package-information.css']
})
export class AddPackageInformation {
// add-package-information.ts (or the component that owns this template)
packages = [
  { id: 1, name: 'Silver' },
  { id: 2, name: 'Gold' },
  { id: 3, name: 'Platinum' },
];

  @Input() formGroup!: FormGroup;

  // tiny helper to show errors only after interaction
  isInvalid(name: string): boolean {
    const c = this.formGroup.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
