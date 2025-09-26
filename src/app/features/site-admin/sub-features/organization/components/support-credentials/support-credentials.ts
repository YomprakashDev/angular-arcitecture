import { Component, input } from '@angular/core';
import { SupportCredentialsDto } from '../../models/organization.model';

@Component({
  selector: 'app-support-credentials',
  standalone: true,
  imports: [],
  templateUrl: './support-credentials.html',
  styleUrls: ['./support-credentials.css']
})
export class SupportCredentials {

  supportResponse = input<SupportCredentialsDto | null>(null);
}
