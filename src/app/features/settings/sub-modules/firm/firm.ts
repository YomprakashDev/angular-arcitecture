import { CommonModule } from '@angular/common';
import { Component, inject, signal, ViewChild } from '@angular/core';
import { Button } from "../../../../shared/components/ui/button/button";
import { AppIcons } from '../../../../../assets/icons/icons';
import { LucideAngularModule } from "lucide-angular";
import { FirmSerivice, OrgFirmDto } from './services/firm.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Modal } from "../../../../shared/components/ui/modal/modal";
import { AddFirm } from "./components/add-firm/add-firm";

@Component({
  selector: 'app-firm',
  imports: [CommonModule, Button, LucideAngularModule, Modal, AddFirm],
  templateUrl: './firm.html',
  styleUrl: './firm.css'
})
export class Firm {
  @ViewChild('addFirmRef') addFirm?: AddFirm; 
  icons = AppIcons;

  isNewFirmAdding = signal(false);
   // 👇 same approach as your Teams component
  isLoading = signal(true);
  error = signal<string | null>(null);
  firm = signal<OrgFirmDto[]>([]);

  private orgFirmsSvc = inject(FirmSerivice);

  constructor() {
    this.loadFirms();
  }

  submitForm(){
    this.addFirm?.submitFromParent()
  }

   onSubmitted(dto: OrgFirmDto) { 
    this.orgFirmsSvc.addOrgFirm(dto).subscribe(() => {
      this.isNewFirmAdding.set(false);
      this.loadFirms();
    });
  }

  loadFirms() {
    this.orgFirmsSvc.getOrgFirms(1)
      .pipe(
        catchError(err => {
          this.error.set(err?.message ?? 'Failed to load firms');
          return EMPTY;
        }),
        finalize(() => this.isLoading.set(false)),
        takeUntilDestroyed()
      )
      .subscribe(rows => {
        this.firm.set(rows);
      });
    }
}
