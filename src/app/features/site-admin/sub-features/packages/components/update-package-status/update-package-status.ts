import { Component, input } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { SubModule } from '../../models/package.model';

@Component({
  selector: 'app-update-package-status',
  imports: [LucideAngularModule],
  templateUrl: './update-package-status.html',
  styleUrl: './update-package-status.css'
})
export class UpdatePackageStatus {
  icons = AppIcons;
  subModules = input.required<SubModule[]>()
}
