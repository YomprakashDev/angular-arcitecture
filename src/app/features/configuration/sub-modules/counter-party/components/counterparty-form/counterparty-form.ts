import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { CounterPartyType } from '../../models/counter-party.model';
import { CommonModule, JsonPipe } from '@angular/common';
type Option = { id: string; label: string };

@Component({
  selector: 'app-counterparty-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule,LucideAngularModule],
  templateUrl: './counterparty-form.html', 
  styleUrls: ['./counterparty-form.css']
})
export class CounterpartyForm {


  readonly countryOptions: Option[] = [
    { id: 'usa', label: 'USA' },
    { id: 'ind', label: 'India' },
    { id: 'sg', label: 'Singapore' },
  ];

  counterPartyTypesData = input<CounterPartyType[]>([]);

  readonly deleteIcon = Trash;
  private formBuilder = inject(FormBuilder);

  form = this.formBuilder.group({
    // Counterparty Information
    counterPartyName: ['', Validators.required],
    type: new FormControl<number | null>(null, Validators.required),

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
