import { HttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Team } from '../model/teams.model';
import { environment } from '../../../../../../environments/environment';

interface Payload{

    teamName: string;
    teamCode: string;
    createdDate: string;
    modifiedDate: string;

}

@Injectable({
  providedIn: 'root'
})
export class TeamsService {


  http = inject(HttpClient);
  apiUrl = environment.apiUrl;

  getAllTeamsData(): Observable<Team[]> {
    return this.http.get<Team[]>(`${this.apiUrl}/OrgTeam/GetTeams/?OrgID=1`);
  }

  addNewTeam(team: Payload): 
  Observable<Payload> {
    return this.http.post<Team>
    (`${this.apiUrl}/OrgTeam/AddNewOrgTeams`, team);
  }

}
