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
  // static dropdown options
  readonly industries = ['Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Education'];
  readonly states = ['California', 'Texas', 'New York', 'Florida', 'Washington'];
  readonly countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];
  readonly currencies = ['USD', 'EUR', 'INR', 'GBP', 'AUD'];
  readonly timezones = ['UTC', 'UTC+1', 'UTC+5:30', 'UTC-5', 'UTC+10'];
  readonly teamSizes = ['1–10', '11–50', '51–200', '201–500', '500+'];


  @Input() formGroup!: FormGroup;

  // file -> FormControl(File|null) (Reactive Forms cannot bind File directly without a change handler)
  onLogoSelected(evt: Event) {
    const file = (evt.target as HTMLInputElement).files?.[0] ?? null;
    const ctrl = this.formGroup.get('logo');
    ctrl?.setValue(file, { emitEvent: true });
    ctrl?.markAsDirty();
    ctrl?.markAsTouched();
  }

  // tiny helper for showing errors only when touched/dirty
  isInvalid(name: string): boolean {
    const c = this.formGroup.get(name);
    return !!(c && c.invalid && (c.dirty || c.touched));
  }
}
