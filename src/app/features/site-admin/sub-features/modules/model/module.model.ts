export interface Module {
    id: number;
    moduleName: string;
    moduleCode: string;
    displayOrder: number;
    description: string;
    icon: string;
    status: boolean;
}

export interface ModuleResponse {
    currentPage: number;
    pageSize: number;
    totalPages: number;
    totalRecords: number;
    data: Module[];
}
