import { Injectable, inject } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

export interface OrgFirmDto {
  firmID: number;
  firmName: string;
  firmincorporated: string | null;
  companyType: number | string | null;
  address: string | null;
  zIpCode: string | null;
  status: number | null;
  orgID: number;
  timeZone: string | null;
  formateDate: string | null;
  logo?: string ;
  createdBy: number | null;
  createdDate?: string | null;
  modifiedBy: number | null;
  modifiedDate?: string | number | null;
}

@Injectable({
  providedIn: 'root'
})
export class FirmSerivice {

   private http = inject(HttpClient);
   private apiUrl = environment.apiUrl;

   
  getOrgFirms(orgId: number): Observable<OrgFirmDto[]> {
    return this.http.get<OrgFirmDto[]>(`${this.apiUrl}/OrgFirms/GetOrgFirms?OrgID=1`);
  }

   
  addOrgFirm(payload: OrgFirmDto): Observable<any> {
    return this.http.post(`${this.apiUrl}/OrgFirms/AddOrgFirm`, payload);
  }
}
