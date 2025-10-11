import { ChangeDetectionStrategy, Component, input } from '@angular/core';
import { OrganizationData, OrganizationItem } from '../../models/organization.model';

@Component({
  standalone:true,
  selector: 'app-organization-details',
  imports: [],
  templateUrl: './organization-details.html',
  styleUrls: ['./organization-details.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class OrganizationDetails {



  organizationDetails = input.required<OrganizationItem | null>()

}
