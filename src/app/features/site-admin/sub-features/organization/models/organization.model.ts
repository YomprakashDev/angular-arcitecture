export interface OrganizationData {
  currentPage?: null | number,
  pageSize?: number,
  totalPages?: number,
  totalRecords?: number,
  data: OrganizationItem[];

}
export interface OrganizationItem {
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
  startDate: string;
  validUpto: string;
  puc?: number;
}

export interface CreateOrganizationRequest {
  organization: OrganizationDto;
  package: PackageDto;
}

// organization.dto.ts
export interface OrganizationDto {
  modifiedBy: number;
  modifiedDate: string;      // ISO datetime
  timeZone: string;
  webURL: string;
  address: string;
  createdDate: string;       // ISO datetime
  organizationID: number;
  organization: string;      // org name
  organizationCode: string;
  logo: string;
  emailID: string;
  industry: number;          // ID
  gstNumber: string;
  zipCode: string;
  countryID: number;         // ID
  stateID: number;           // ID
  contactPersonName: string;
  contactNumber: string;
  currency: number;          // ID
  status: number;            // 0/1
  createdBy: number;
}

// package.dto.ts
export interface PackageDto {
  validFrom: string;               // ISO datetime
  validTo: string;                 // ISO datetime
  organizationID: number;
  packageID: number;               // ID
  status: number;                  // 0/1
  noOfUsers: number;
  puc: number;
  dealAmount: number;
  gst: number;
  createdBy: number;
  createdDate: string;             // ISO datetime
  modifiedBy: number;
  modifiedDate: string;            // ISO datetime
  organizationPackageID: number;
}


export interface SupportCredentialsDto {
  organizationID: number;
  supportUserId: number;
  supportUserEmailID: string | null;
  supportUserPassword: string | null;
}
