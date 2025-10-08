import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { CounterPartyModel } from '../models/counter-party.model';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class Counterparty {
  private http = inject(HttpClient)

  apiUrl = environment.apiUrl;

  getCounterParties(orgId: number): Observable<CounterPartyModel[]> {
      return this.http.get<CounterPartyModel[]>(`${this.apiUrl}/CounterParty/GetAllCounterParties/${orgId}`)
    }

}
