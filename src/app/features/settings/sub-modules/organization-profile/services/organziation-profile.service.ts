import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { OrganizationData, OrganizationItem } from '../../../../site-admin/sub-features/organization/models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganziationProfile {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getOrgProfileDetals(orgId: number): Observable<OrganizationItem> {

    return this.http.get<OrganizationItem>(`${this.apiUrl}/Organizations/GetOrganizationById/${orgId}`);
  }
}
