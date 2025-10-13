import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { ContractType } from '../models/metadata.model';

@Injectable({
  providedIn: 'root'
})
export class MetadataService {
  private http = inject(HttpClient);

  /** Base API URL */
  private apiUrl = environment.apiUrl;

  getMetadata(orgId: number): Observable<ContractType[]> {
    return this.http.get<ContractType[]>(`${this.apiUrl}/MetaData/orgId/${orgId}/contractTypes`);
  }
}
