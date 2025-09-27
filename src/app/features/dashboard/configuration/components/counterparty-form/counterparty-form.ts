import { Component, inject } from '@angular/core';
import { FormBuilder, FormGroup, Validators,ReactiveFormsModule } from '@angular/forms';
type Option = { id: string; label: string };

@Component({
  selector: 'app-counterparty-form',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './counterparty-form.html',
  styleUrls: ['./counterparty-form.css']
})
export class CounterpartyForm {

  // dropdown options
  readonly typeOptions: Option[] = [
    { id: 'vendor',  label: 'Vendor'  },
    { id: 'client',  label: 'Client'  },
    { id: 'partner', label: 'Partner' },
  ];

  readonly countryOptions: Option[] = [
    { id: 'usa', label: 'USA' },
    { id: 'ind', label: 'India' },
    { id: 'sg',  label: 'Singapore' },
  ];

  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    // Counterparty Information
    counterPartyName: ['', Validators.required],
    type: ['', Validators.required],
    websiteUrl: [''],

    // Address Details
    streetAddress: ['', Validators.required],
    city: [''],
    state: ['', Validators.required],
    country: ['', Validators.required],
    isPrimary: [false],

    // Contact Details
    contactPersonName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]{7,20}$/)]],
    designation: ['', Validators.required],
  });
}
