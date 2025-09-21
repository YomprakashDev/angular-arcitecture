import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PackagesResponse } from '../models/package.model';
import { environment } from '../../../../../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class PackageService {
  http = inject(HttpClient);
  private apiUrl = environment.apiUrl
  getPackages(): Observable<PackagesResponse> {
    return this.http.get<PackagesResponse>(`${this.apiUrl}/Packages`);
  }
}
