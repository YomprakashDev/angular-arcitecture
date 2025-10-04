export interface User {
    userID: number;
    fullName: string;
    aliasName: string;
    emailID: string;
    phoneNumber: string;
    status: number;        // consider making this an enum
    userType: number;      // consider making this an enum
    roleId: number;
    teamID: number;
    orgID: number;
    psw: string;
    createdBy: number;
    createdDate: string;   // ISO date string
    modifiedBy: number;
    modifiedDate: string | null;
}
