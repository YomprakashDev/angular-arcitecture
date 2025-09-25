export interface OrganizationData {
  orgDetails: OrgDetails;
  contactDetails: ContactDetails;
  packageInfo: PackageInfo;
}

export interface OrgDetails {
  organizationName: string;
  industryName: string;
  organizationalURL: string;
  gstNumber: string;
  address: string;
  zipCode: string;
  stateName: string;
  countryName: string;
  currencyCode: string;
  timeZone: string;
}
export type ISODateTimeString = string;


export interface ContactDetails {
  contactPersonName: string;
  contactNumber: string;
  emailID: string;
}

export interface PackageInfo {
  packageID: number;
  packageName: string;
  userCount: number;
  dealAmount: number;
  gst: number;
  startDate: string;   // ISO date string (e.g., 2025-09-19T00:00:00)
  validUpto: string;   // ISO date string
}

export interface CreateOrganizationRequest {
  organization: OrganizationCreate;
  package: OrganizationPackageCreate;
}

export interface OrganizationCreate {
  modifiedBy: number;
  modifiedDate: ISODateTimeString;

  timeZone: string;
  webURL: string;
  address: string;

  createdDate: ISODateTimeString;
  organizationID: number;      // if server sets this, you can make it optional
  organization: string;        // organization name
  organizationCode: string;
  logo: string;                 // URL or base64 per API

  emailID: string;
  industry: number;            // industry ID
  gstNumber: string;
  zipCode: string;
  countryID: number;           // country ID
  stateID: number;             // state ID
  contactPersonName: string;
  contactNumber: string;
  currency: number;            // currency ID
  status: number;              // numeric status (e.g., 0/1)
  createdBy: number;
}

export interface OrganizationPackageCreate {
  validFrom: ISODateTimeString;
  validTo: ISODateTimeString;

  organizationID: number;      // link to organization
  packageID: number;           // selected package ID
  status: number;              // numeric status (e.g., 0/1)
  noOfUsers: number;
  puc: number;
  dealAmount: number;
  gst: number;

  createdBy: number;
  createdDate: ISODateTimeString;
  modifiedBy: number;
  modifiedDate: ISODateTimeString;

  organizationPackageID: number; // if server sets this, you can make it optional
}