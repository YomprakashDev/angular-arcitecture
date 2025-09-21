export interface SubModuleResponse {
  currentPage: number;
  pageSize: number;
  totalPages: number;
  totalRecords: number;
  data: SubModule[];
}

export interface SubModule {
  id: number;
  subModuleName: string;
  status: boolean;
  displayOrder: number;
  children: ChildModule[];
  expanded?: boolean; // <-- frontend-only property
  editable?: boolean; // <-- frontend-only property

}

export interface ChildModule {
  childId: number;
  childName: string;
  childCode: string;
  status: boolean;
}
