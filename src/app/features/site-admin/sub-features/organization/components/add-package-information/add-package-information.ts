import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';

@Component({
  selector: 'app-add-package-information',
  imports: [CommonModule],
  templateUrl: './add-package-information.html',
  styleUrl: './add-package-information.css'
})
export class AddPackageInformation {
// static options only (no logic required)
  packages = ['Silver', 'Gold', 'Platinum'];
}
