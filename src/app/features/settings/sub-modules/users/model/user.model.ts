export interface User {
    userID: number;
    fullName: string;
    aliasName: string;
    emailID: string;
    phoneNumber: string;
    status: number;        
    userType: number;     
    roleId: number;
    teamID: number;
    orgID: number;
    psw: string;
    createdBy: number;
    createdDate: string;   
    modifiedBy: number;
    modifiedDate: string | null;
}
