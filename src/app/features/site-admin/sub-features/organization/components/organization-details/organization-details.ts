import { Component, input } from '@angular/core';
import { OrganizationData, OrganizationItem } from '../../models/organization.model';

@Component({
  selector: 'app-organization-details',
  imports: [],
  templateUrl: './organization-details.html',
  styleUrl: './organization-details.css'
})
export class OrganizationDetails {



  organizationDetails = input.required<OrganizationItem | null>()

}
