export interface Tag {
  tagID: number;
  tagName: string;
  status: number;
  orgID: number;
  createdBy: number;
  createdDate: string;  // ISO 8601 format date
  modifidBy: number;    // (optional: probably meant 'modifiedBy')
  modifiedDate: string; // ISO 8601 format date
}
