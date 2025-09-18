import { HttpClient } from '@angular/common/http';
import { inject, Injectable, signal } from '@angular/core';
import { ModuleResponse } from '../model/module.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class ModuleService {
  private http = inject(HttpClient)
  private apiUrl = 'http://erp.iguru.guru/CLM/api/Modules';


  getModules(page:number,pageSize:number):Observable<ModuleResponse> {
    return this.http.get<ModuleResponse>(`${this.apiUrl}?page=${page}&pageSize=${pageSize}`);
     
  }
}