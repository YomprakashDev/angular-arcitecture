import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-add-view-packages',
  imports: [FormsModule],
  templateUrl: './add-view-packages.html',
  styleUrl: './add-view-packages.css'
})
export class AddViewPackages {
  packageName = signal('Silver')
}
