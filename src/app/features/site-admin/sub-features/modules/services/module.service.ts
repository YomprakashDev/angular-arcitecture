import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Module, ModuleResponse } from '../model/module.model';
import { Observable } from 'rxjs';
import { environment } from '../../../../../../environments/environment';

@Injectable({ providedIn: 'root' })
export class ModuleService {
  private http = inject(HttpClient);
  private apiUrl = environment.apiUrl;

  getModules(page: number, pageSize: number): Observable<ModuleResponse> {
    return this.http.get<ModuleResponse>(`${this.apiUrl}/Modules/GetAllModulesAsync/?page=${page}&pageSize=${pageSize}`);
  }

  saveModule(module: Module): Observable<Module> {
    return this.http.put<Module>(`${this.apiUrl}/Modules/EditModuleAsync/${module.id}`, module);
  }

  updateStatus(id: number, status: boolean): Observable<Module> {
    return this.http.patch<Module>(`${this.apiUrl}/Modules/ToggleStatusAsync/${id}/status`, status);
  }
}
