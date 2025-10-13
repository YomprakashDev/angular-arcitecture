// Child level
export interface ChildItem {
  childID: number 
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
// Package level 
export interface PackageItem {
  packageID: number;
  packageName: string;
  packageStatus: number;
  modules: ModuleItem[];
}
export type PackagesResponse = PackageItem[];

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
  childID: number | null;
  status: number; 
}

export interface SelectedPkgModule {
  moduleID: number;
  status: number;
  selectedPkgSub: SelectedPkgSub[];
}

export interface SelectedPkgSub {
  submmoduleIeid: number;
  status: number;
  selectedPkgChild?: SelectedChild[];
}

export interface PackageRow {
  packageID: number;
  packageName: string;
  modules: string[];
  status: boolean;
}