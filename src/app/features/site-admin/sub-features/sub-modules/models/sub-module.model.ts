




// sub-module.model.ts

export interface Child {
  childID: number;
  childName: string;
  subChildStatus: boolean;
}

export interface SubModule {
  subModuleId: number;
  subModuleName: string;
  subModuleStatus: boolean;
  expanded?: boolean; // <-- frontend-only property
  children: Child[];
}

export interface Module {
  moduleID: number;
  moduleName: string;
  moduleStatus: boolean;
  subModules: SubModule[];
}

export type Modules = Module[];
