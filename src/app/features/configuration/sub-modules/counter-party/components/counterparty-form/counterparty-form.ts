import { Component, inject, input } from '@angular/core';
import { FormBuilder, FormGroup, Validators, ReactiveFormsModule, FormControl } from '@angular/forms';
import { LucideAngularModule, Trash } from 'lucide-angular';
import { CounterPartyType } from '../../models/counter-party.model';
import { CommonModule, JsonPipe } from '@angular/common';
type Option = { id: string; label: string };

@Component({
  selector: 'app-counterparty-form',
  standalone: true,
  imports: [ReactiveFormsModule, CommonModule, LucideAngularModule],
  templateUrl: './counterparty-form.html',
  styleUrls: ['./counterparty-form.css']
})
export class CounterpartyForm {

  form = input.required<FormGroup>();

  readonly countryOptions: Option[] = [
    { id: 'usa', label: 'USA' },
    { id: 'ind', label: 'India' },
    { id: 'sg', label: 'Singapore' },
  ];

  counterPartyTypesData = input<CounterPartyType[]>([]);

  readonly deleteIcon = Trash;


}
