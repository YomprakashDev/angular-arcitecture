import { Component, input } from '@angular/core';

@Component({
  selector: 'app-error-banner',
  standalone: true,
  imports: [],
  templateUrl: './error-banner.html',
  styleUrls: ['./error-banner.css']
})
export class ErrorBanner {
  message = input()
}
