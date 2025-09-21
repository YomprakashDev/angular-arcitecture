import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { SubModuleResponse } from '../models/sub-module.model';

/**
 * A service for managing sub-module-related data and operations.
 * This service will be responsible for fetching, creating, updating, and deleting sub-module data.
 */
@Injectable({
  providedIn: 'root'
})
export class SubModulesService {

  http = inject(HttpClient);
  private apiUrl = environment.apiUrl
  getSubModules(id: number, page: number, pageSize: number): Observable<SubModuleResponse> {
    return this.http.get<SubModuleResponse>(`${this.apiUrl}/Modules/${id}/submodules?currentPage=${page}&pageSize=${pageSize}`);
  }
}
