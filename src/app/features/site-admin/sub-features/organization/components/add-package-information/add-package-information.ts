import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup } from '@angular/forms';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';

@Component({
  standalone: true,
  selector: 'app-add-package-information',
  imports: [CommonModule, ReactiveFormsModule, LucideAngularModule],
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

  icons = AppIcons;

  @Input() formGroup!: FormGroup;

 
  isInvalid(name: string): boolean {
    const c = this.formGroup.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
