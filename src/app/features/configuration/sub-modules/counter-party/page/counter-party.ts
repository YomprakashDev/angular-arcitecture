import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Modal } from '../../../../../shared/components/ui/modal/modal';
import { CounterpartyForm } from '../components/counterparty-form/counterparty-form';
import { ConfirmDialog } from '../../../../../shared/components/ui/confirm-dialog/confirm-dialog';
import { Plus, Search, Eye, LucideAngularModule, SquarePen, Trash } from 'lucide-angular';
import { ViewCounterpartyInformation } from "../components/view-counterparty-information/view-counterparty-information";
import { Counterparty } from '../services/counter-party.service';
import { CounterPartyModel, ViewCounterParty } from '../models/counter-party.model';
import { AppIcons } from '../../../../../../assets/icons/icons';


type CounterpartyType = 'Vendor' | 'Client' | 'Partner';


@Component({
  selector: 'app-counter-party',
  standalone: true,
  imports: [CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule, Modal, CounterpartyForm,
    LucideAngularModule, ConfirmDialog,

     ViewCounterpartyInformation],
  templateUrl: './counter-party.html',
  styleUrls: ['./counter-party.css']
})
export class CounterParty {

  readonly types: CounterpartyType[] = ['Vendor', 'Client', 'Partner'];
  readonly countries = ['USA', 'India'];
  // ---------- Table ----------
  displayedColumns = [
    'actions',
    'name',
    'type',
    'address',
    'city',
    'state',
    'country',
    'contactName',
    'contactNumber',
  ] as const;


  dataSource = new MatTableDataSource<CounterPartyModel>();

  icons = AppIcons;

  counterPartyService = inject(Counterparty);

  constructor() {
    this.loadCounterParties();
  }

  counterPartyData = signal<CounterPartyModel[]>([]);

  viewCounterPartyData = signal<ViewCounterParty>({
    counterPartyName: '',
    webSiteUrl: '',
    counterPartyType: 0,
    newAddressList: [],
    newContactList: []
  });

  viewParty(id:number) {
    this.counterPartyService.viewCounterParyDetails(id).subscribe({
      next:(res) => {
       
        this.viewCounterPartyData.set(res);
      },
      error:(e) => {
        console.log(e)
      }
    })
  }

  loadCounterParties() {
    this.counterPartyService.
      getCounterParties(3001).subscribe(res => {
        this.counterPartyData.set(res);
        this.dataSource.data = res;
      })
  }

  // --- UI state  ---
  readonly selectedType = signal<string>('');
  readonly selectedCountry = signal<string>('');
  readonly search = signal<string>('');
  isButtonsShowing = signal(false);
  isAdding = signal(false);
  isDeleting = signal(false);
  isViewing = signal(false);
  addCounterParty() {
    this.isAdding.set(true);
  }

  viewCounterParty(r:CounterPartyModel) {
   
    this.isViewing.set(true);
    
    this.viewParty(r.orgCounterPartyID);
  }



  editCounterParty() {

  }

  deleteCounterParty() {
    this.isDeleting.set(true);
  }

}
