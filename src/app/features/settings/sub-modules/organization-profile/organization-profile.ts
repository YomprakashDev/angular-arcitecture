import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../assets/icons/icons';
import { OrganziationProfile } from './services/organziation-profile.service';
import { OrganizationData, OrganizationItem } from '../../../site-admin/sub-features/organization/models/organization.model';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';

@Component({
  standalone: true,
  selector: 'app-organization-profile',
  imports: [LucideAngularModule],
  templateUrl: './organization-profile.html',
  styleUrls: ['./organization-profile.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class OrganizationProfile implements OnInit {
  icons = AppIcons;

  orgPfofileService = inject(OrganziationProfile);
  destoryRef = inject(DestroyRef);

  isLoading = signal(true);
  error = signal<string | null>(null)
  orgProfileData = signal<OrganizationItem | null>(null);


  ngOnInit(): void {
    this.loadOrgProfileDetails()
  }

  loadOrgProfileDetails() {
    this.orgPfofileService.getOrgProfileDetals(3001)
      .pipe(
        catchError(err => {
          this.error.set(err?.message ?? 'Failed to load firms');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed(this.destoryRef)
      )
      .subscribe(rows => {
        this.orgProfileData.set(rows);
      });

  }
}
