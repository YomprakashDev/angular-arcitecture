// Child level
export interface ChildItem {
  childID: number | null;
  childName: string;
  subChildStatus: boolean;
}
// Sub-module level
export interface SubModule {
  subModuleId: number;
  subModuleName: string;
  subModuleStatus: boolean;
  children: ChildItem[];
}
// Module level
export interface ModuleItem {
  moduleID: number;
  moduleName: string;
  moduleStatus: boolean;
  subModules: SubModule[];
}
// Package level (root object)
export interface PackageItem {
  packageID: number;
  packageName: string;
  packageStatus: number;
  modules: ModuleItem[];
}
export type PackagesResponse = PackageItem[];

// models/package-request.model.ts
export interface PackageRequest {
  packageId: number;
  packageName: string;
  packageCode: string;
  createdby: number;
  status: number;
  selectedPkgModule: SelectedPkgModule[];
}
//  child structure
export interface SelectedChild {
  childId: number;
  status: number; 
}

export interface SelectedPkgModule {
  moduleID: number;
  status: number;
  selectedPkgSub: SelectedPkgSub[];
}

export interface SelectedPkgSub {
  subModuleId: number;
  status: number;
  selectedChildren?: SelectedChild[];
}



