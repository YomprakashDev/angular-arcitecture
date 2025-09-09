import { Component, input, output, signal } from '@angular/core';

@Component({
  selector: 'app-input-field',
  imports: [],
  templateUrl: './input-field.html',
  styleUrl: './input-field.css'
})
export class InputField {
label = input.required<string>();
  type = input<string>('text');
  placeholder = input<string>('');
  icon = input<string | null>(null);
  required = input<boolean>(false);

  valueChanged = output<string>();

  id = signal('');
  errorMessage = signal('');
}
