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

