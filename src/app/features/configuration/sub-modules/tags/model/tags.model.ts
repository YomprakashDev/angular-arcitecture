export interface Tag {
  tagID: number;
  tagName: string;
  status: number;
  orgID: number;
  createdBy: number;
  createdDate: string;
  modifidBy: number;
  modifiedDate: string;
}
// New type for editing
export type EditTagPayload = {
   tagID: number ,
   modifidBy:number,
  } & Partial<Omit<Tag, 'tagID'>>;
