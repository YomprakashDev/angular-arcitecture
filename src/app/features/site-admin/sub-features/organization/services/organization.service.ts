import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { CreateOrganizationRequest, OrganizationData, SupportCredentialsDto, toggleBody } from '../models/organization.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  http = inject(HttpClient)

  apiUrl = environment.apiUrl

  getOrganizations(): Observable<OrganizationData> {
    return this.http.get<OrganizationData>(`${this.apiUrl}/Organizations`,)
  };

  addNewOrganization(organization: CreateOrganizationRequest): Observable<SupportCredentialsDto> {
    return this.http.post<SupportCredentialsDto>(`${this.apiUrl}/Organizations/AddNewOrganization`, organization)
  };

  // statusUpdateOrganization(orgId: number, status: boolean): Observable<toggleBody> {
  //   return this.http.patch<toggleBody>
  // (`${this.apiUrl}/Organizations/ToggleStatusAsync/
  // ${orgId}?status=${status}`)
  // }

}
