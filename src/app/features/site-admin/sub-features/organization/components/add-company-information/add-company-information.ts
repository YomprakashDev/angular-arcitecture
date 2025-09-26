import { Component, inject, Input, input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-add-company-information',
  imports: [CommonModule, ReactiveFormsModule],
  templateUrl: './add-company-information.html',
  styleUrls: ['./add-company-information.css']
})
export class AddCompanyInformation {
  readonly industries = [
    { id: 1, name: 'Technology' },
    { id: 2, name: 'Finance' },
    { id: 3, name: 'Healthcare' },
    { id: 4, name: 'Manufacturing' },
    { id: 5, name: 'Retail' },
    { id: 6, name: 'Education' },
  ];

  readonly countries = [
    { id: 1, name: 'United States' },
    { id: 2, name: 'India' },
    { id: 3, name: 'United Kingdom' },
    { id: 4, name: 'Canada' },
    { id: 5, name: 'Australia' },
  ];

  readonly states = [
    { id: 101, name: 'California' },
    { id: 102, name: 'Texas' },
    { id: 103, name: 'New York' },
    { id: 104, name: 'Florida' },
    { id: 105, name: 'Washington' },
  ];

  readonly currencies = [
    { id: 840, name: 'USD' },
    { id: 978, name: 'EUR' },
    { id: 356, name: 'INR' },
    { id: 826, name: 'GBP' },
    { id: 36,  name: 'AUD' },
  ];

  readonly timezones = ['UTC', 'UTC+1', 'UTC+5:30', 'UTC-5', 'UTC+10'];
  readonly teamSizes = ['1–10', '11–50', '51–200', '201–500', '500+'];

  @Input() formGroup!: FormGroup;

  logoPreview: string | null = null;

  // file -> FormControl(File|null) (Reactive Forms cannot bind File directly without a change handler)
  onLogoSelected(evt: Event) {
    const file = (evt.target as HTMLInputElement).files?.[0] ?? null;
    const ctrl = this.formGroup.get('logo');
    ctrl?.setValue(file, { emitEvent: true });
    ctrl?.markAsDirty();
    ctrl?.markAsTouched();

    if (file) {
      this.logoPreview = URL.createObjectURL(file);
    } else {
      this.logoPreview = null;
    }
  }

  // tiny helper for showing errors only when touched/dirty
  isInvalid(name: string): boolean {
    const c = this.formGroup.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
