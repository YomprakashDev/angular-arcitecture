import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Module, Modules } from '../models/sub-module.model';

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
  
  getSubModules(): Observable<Modules> {
    return this.http.get<Modules>(`${this.apiUrl}/SubModules`);
  }

}
