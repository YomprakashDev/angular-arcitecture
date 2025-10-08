import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { Observable } from 'rxjs';
import { Tag } from '../model/tags.model';

@Injectable({
  providedIn: 'root'
})
export class Tagsservice {
  private http = inject(HttpClient)

  apiUrl = environment.apiUrl;


  getTags(orgId: number): Observable<Tag[]> {
    return this.http.get<Tag[]>(`${this.apiUrl}/Tags/GetTags/${orgId}`)
  }

  addNewTag(data: Tag): Observable<Tag[]> {
    return this.http.post<Tag[]>(`${this.apiUrl}/Tags/AddNewTags`, data)
  }

  editTag(payLoad: Tag) {
    return this.http.put(`${this.apiUrl}/Tags/EditTag`, payLoad)
  }

}
