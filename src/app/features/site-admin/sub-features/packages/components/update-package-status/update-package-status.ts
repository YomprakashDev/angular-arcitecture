import { Component, input, signal } from '@angular/core';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';
import { SubModule } from '../../models/package.model';
import { CommonModule } from '@angular/common';
import { Button } from "../../../../../../shared/components/ui/button/button";

@Component({
  selector: 'app-update-package-status',
  imports: [LucideAngularModule, CommonModule, Button],
  templateUrl: './update-package-status.html',
  styleUrl: './update-package-status.css'
})
export class UpdatePackageStatus {
  icons = AppIcons;
  subModules = input.required<SubModule[]>();

  selectedPkgModule = signal([])
}
