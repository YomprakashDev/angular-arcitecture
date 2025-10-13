export interface ContractType {
  contractTypeId: number;
  contractTypeName: string;
  contractTypeCode: string;
  noOfContracts: number;
  lastUpdated: string; // ISO date string (e.g. "0001-01-01T00:00:00")
}

export interface MetadataSection {
  sectionId: number;
  sectionName: string;
}

export type MetadataSectionList = MetadataSection[];
