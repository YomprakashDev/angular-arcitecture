import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { environment } from '../../../../../../environments/environment';
import { ViewCounterParty, CounterPartyModel, CounterPartyType } from '../models/counter-party.model';
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

  viewCounterParyDetails(orgId: number): Observable<ViewCounterParty> {
    return this.http.get<ViewCounterParty>(`${this.apiUrl}/CounterParty/GetCounterParty/${orgId}`)

  }

  getAllCounterParties(): Observable<CounterPartyType[]>{
  return this.http.get<CounterPartyType[]>(`${this.apiUrl}/CounterParty/GetCounterPartyTypes`);
  }

}
