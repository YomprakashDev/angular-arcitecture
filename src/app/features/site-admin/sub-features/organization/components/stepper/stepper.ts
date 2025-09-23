import { Component, input } from '@angular/core';
import { CommonModule } from '@angular/common';

type Step = { number: number; label: string };

@Component({
  selector: 'app-stepper',
  imports: [ 
    CommonModule
],
  templateUrl: './stepper.html',
  styleUrl: './stepper.css'
})
export class Stepper {
 // static data (no click handlers / routing)
  steps: Step[] = [
    { number: 1, label: 'Company Information' },
    { number: 2, label: 'Package Information' },
    { number: 3, label: 'Support Credentials' }
  ];

  // static current step (0 = first)
  currentIndex = 0;

  currentStep = input.required<number>();
}
