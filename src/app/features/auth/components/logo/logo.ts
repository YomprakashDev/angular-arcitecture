import { Component, input } from '@angular/core';

@Component({
  selector: 'app-logo',
  imports: [],
  templateUrl: './logo.html',
  styleUrl: './logo.css'
})
export class Logo {
  src = input<string>();
  alt = input<string>();
}
