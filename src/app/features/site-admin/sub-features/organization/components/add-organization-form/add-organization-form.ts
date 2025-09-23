import { Component, input, signal } from '@angular/core';
import { AddCompanyInformation } from "../add-company-information/add-company-information";
import { AddPackageInformation } from "../add-package-information/add-package-information";
import { SupportCredentials } from "../support-credentials/support-credentials";
export type AddOrganizationFormType = [
  'Company Information',
  'Package Information',
  'Support Credentials',
];
@Component({
  selector: 'app-add-organization-form',
  imports: [AddCompanyInformation, AddPackageInformation, SupportCredentials],
  templateUrl: './add-organization-form.html',
  styleUrl: './add-organization-form.css'
})


export class AddOrganizationForm {
  
currentFormIndex = input.required<number>()

}
