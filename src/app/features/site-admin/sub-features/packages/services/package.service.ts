import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PackagesResponse } from '../models/package.model';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  http = inject(HttpClient);
  private apiUrl = 'http://erp.iguru.guru/CLM/api/Packages'
  getPackages(): Observable<PackagesResponse> {
    return this.http.get<PackagesResponse>(this.apiUrl);
  }
}
