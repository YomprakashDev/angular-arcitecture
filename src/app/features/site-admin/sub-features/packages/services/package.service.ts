import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { PackageRequest, PackageRow, PackagesResponse } from '../models/package.model';
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

  addNewPackage(payload: PackageRequest): Observable<PackageRequest> {
    return this.http.post<PackageRequest>(`${this.apiUrl}/Packages/AddNewPackage`, payload)
  }


 updatePackageStatus(packageId: number, status: boolean) {
  return this.http.patch<PackageRow>(
    `${this.apiUrl}/packages/${packageId}/status`,
    { status }
  );
}
}
