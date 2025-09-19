import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { OrganizationData } from '../models/organization.model';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  http = inject(HttpClient)

  apiUrl = 'http://erp.iguru.guru/CLM/api/Organizations'

  getOrganizations(): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(this.apiUrl)
  }


}
