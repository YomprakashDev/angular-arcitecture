import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable, retry } from 'rxjs';
import { Role, User } from '../model/user.model';

interface addUserPayload {
  fullName: string;
  emailID: string;
  phoneNumber: string;
  roleId: number;
  teamID: number;
  modifiedDate: string;
}
@Injectable({
  providedIn: 'root'
})
export class UserService {
  http = inject(HttpClient);

  apiUrl = environment.apiUrl;

  getUsers(): Observable<User[]> {
    return this.http.get<User[]>(`${this.apiUrl}/User/GetUser?OrgID=1`);
  }

  addNewUser(user: addUserPayload): Observable<addUserPayload[]> {
    return this.http.post<addUserPayload[]>(`${this.apiUrl}/User/AddUser`, user)
  }

  getRoles(): Observable<Role[]> {
    return this.http.get<Role[]>(`${this.apiUrl}/Roles/GetRoles`)
  }

}
