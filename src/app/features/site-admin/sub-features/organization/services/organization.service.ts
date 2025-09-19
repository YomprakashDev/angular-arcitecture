import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

import { Observable } from 'rxjs';
import { OrganizationData } from '../models/organization.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class OrganizationService {
  http = inject(HttpClient)

  apiUrl = environment.apiUrl

  getOrganizations(): Observable<OrganizationData[]> {
    return this.http.get<OrganizationData[]>(this.apiUrl)
  }


}
