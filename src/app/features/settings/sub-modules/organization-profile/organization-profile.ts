import { Component } from '@angular/core';
import { Card } from "../../../../shared/components/ui/card/card";
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../assets/icons/icons';

@Component({
  selector: 'app-organization-profile',
  imports: [ Button, LucideAngularModule],
  templateUrl: './organization-profile.html',
  styleUrl: './organization-profile.css'
})
export class OrganizationProfile {
  icons = AppIcons;
}
