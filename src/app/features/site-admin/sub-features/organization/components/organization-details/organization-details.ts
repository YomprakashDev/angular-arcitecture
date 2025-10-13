import { ChangeDetectionStrategy, Component, input, output } from '@angular/core';
import { OrganizationData, OrganizationItem } from '../../models/organization.model';
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../assets/icons/icons';

@Component({
  standalone:true,
  selector: 'app-organization-details',
  imports: [LucideAngularModule],
  templateUrl: './organization-details.html',
  styleUrls: ['./organization-details.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OrganizationDetails {


  closeView = output();

  icons = AppIcons;

  onBack(){
    this.closeView.emit()
  }

  organizationDetails = input.required<OrganizationItem | null>()

}
