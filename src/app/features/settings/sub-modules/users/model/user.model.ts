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

export interface Role {
  roleID: number;
  roleName: string;
  roleCode: string;
  status: number; // or boolean if 1/0 represents true/false
  displayOrder: number;
  createdBy: number;
  createdDate: string; // or Date/DateTime object type
  modifiedBy: number;
  modifiedDate: string; // or Date/DateTime object type
}