import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import {  Module, Modules, SubModule } from '../models/sub-module.model';

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

  saveSubModuleName(title: string, id: number): Observable<Module> {
      const safe = encodeURIComponent(title.trim());     
    return this.http.patch<Module>(
      `${this.apiUrl}/SubModules/${id}/title?subModuleName=${safe}`,
      {},
    );
  }

  updateSubModuleStatus(id: number, status: boolean): Observable<SubModule> {

    return this.http.patch<SubModule>(`${this.apiUrl}/SubModules/${id}/status?status=${status}`, {})

  }


  updateChildModuleStatus(id: number, status: boolean): Observable<SubModule> {

    return this.http.patch<SubModule>(`${this.apiUrl}/SubModules/children/${id}/status?status=${status}`, {})

  }

  // saveChildSubModuleName(title:string,id:number):Observable<Child>{
  //   return this.http.patch<Child>(`${this.apiUrl}`)

}
