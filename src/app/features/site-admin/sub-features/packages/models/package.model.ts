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
  modules: ModuleItem[];
}

// Entire payload
export type PackagesResponse = PackageItem[];
