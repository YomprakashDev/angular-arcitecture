import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-company-information',
  imports: [CommonModule],
  templateUrl: './add-company-information.html',
  styleUrl: './add-company-information.css'
})
export class AddCompanyInformation {
// purely for static dropdown options
  industries = [
    'Technology', 'Finance', 'Healthcare', 'Manufacturing', 'Retail', 'Education'
  ];
  states = ['California', 'Texas', 'New York', 'Florida', 'Washington'];
  countries = ['United States', 'India', 'United Kingdom', 'Canada', 'Australia'];
  currencies = ['USD', 'EUR', 'INR', 'GBP', 'AUD'];
  timezones = ['UTC', 'UTC+1', 'UTC+5:30', 'UTC-5', 'UTC+10'];
  teamSizes = ['1–10', '11–50', '51–200', '201–500', '500+'];

  // optional: placeholder for future preview behavior
  onLogoChange(_e: Event) {/* static form, no-op */}
}
