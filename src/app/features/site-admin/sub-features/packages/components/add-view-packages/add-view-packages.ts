import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SubModulePage } from '../../../sub-modules/page/sub-module-page';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';

@Component({
  selector: 'app-add-view-packages',
  imports: [FormsModule, LucideAngularModule],
  templateUrl: './add-view-packages.html',
  styleUrl: './add-view-packages.css'
})
export class AddViewPackages {
  packageName = signal('Silver');

  icons = AppIcons;
}
