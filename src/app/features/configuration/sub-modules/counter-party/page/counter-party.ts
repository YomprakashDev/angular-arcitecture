import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Modal } from '../../../../../shared/components/ui/modal/modal';
import { CounterpartyForm } from '../components/counterparty-form/counterparty-form';
import { ConfirmDialog } from '../../../../../shared/components/ui/confirm-dialog/confirm-dialog';
import { LucideAngularModule } from 'lucide-angular';
import { ViewCounterpartyInformation } from "../components/view-counterparty-information/view-counterparty-information";
import { Counterparty } from '../services/counter-party.service';
import { CounterPartyModel, CounterPartyType, ViewCounterParty, AddCounterParty } from '../models/counter-party.model';
import { AppIcons } from '../../../../../../assets/icons/icons';
import { FormBuilder, FormControl, ReactiveFormsModule, Validators } from '@angular/forms';


type CounterpartyType = 'Vendor' | 'Client' | 'Partner';

@Component({
  selector: 'app-counter-party',
  standalone: true,
  imports: [
    CommonModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatTooltipModule,
    Modal,
    CounterpartyForm,
    LucideAngularModule, ConfirmDialog,
    ReactiveFormsModule,
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


  private fb = inject(FormBuilder);

  form = this.fb.group({
    counterPartyName: ['', Validators.required],
    type: new FormControl<number | null>(null, Validators.required),
    websiteUrl: [''],

    streetAddress: ['', Validators.required],
    city: ['',Validators.required],
    state: ['', Validators.required],
    country: ['', Validators.required],
    isPrimary: [false],

    contactPersonName: ['', Validators.required],
    email: ['', [Validators.required, Validators.email]],
    contactNumber: ['', [Validators.required, Validators.pattern(/^[0-9+\-() ]{7,20}$/)]],
    designation: ['', Validators.required],
  });

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

  viewParty(id: number) {
    this.counterPartyService.viewCounterParyDetails(id).subscribe({
      next: (res) => {

        this.viewCounterPartyData.set(res);
      },
      error: (e) => {
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
    this.loadCounterPartyTypes();
  }

  viewCounterParty(r: CounterPartyModel) {
    this.isViewing.set(true);
    this.viewParty(r.orgCounterPartyID);
  }

  counterPartyTypesData = signal<CounterPartyType[]>([]);

  orgId = 3001;
  userId = 207;
  stateID = 1;
  cityID = 1;
  countryID = 1;

  addNewCounterParty() {

    this.form.markAllAsTouched();
    if (this.form.invalid) return;

    const v = this.form.value;
    const payload = {
      counterPartyName: (v.counterPartyName ?? '').trim(),
      orgID: this.orgId,
      counterPartyType: Number(v.type),
      webSiteUrl: v.websiteUrl || null, 
      createdBy: this.userId,
      createdDate: new Date().toISOString(),
      newAddressList: [
        {
          address: (v.streetAddress ?? '').trim(),
          stateID: this.stateID,
          cityID: this.cityID,
          countryID: this.countryID,
          defultPrimary: v.isPrimary ? 1 : 0
        }
      ],
      newContactsList: [
        {
          personName: (v.contactPersonName ?? '').trim(),
          email: (v.email ?? '').trim(),
          contactNo: (v.contactNumber ?? '').trim(),
          designation: (v.designation ?? '').trim(),
          primaryContact: 1
        }
      ]
    }
    this.counterPartyService.addNewCounterParty(payload).subscribe({
      next: (res) => {
        console.log(res);
        this.isAdding.set(false);
        this.loadCounterParties();
        this.form.reset()
      },
      error: (e) => {
        console.error(e)
      }
    })
  }

  loadCounterPartyTypes() {
    this.counterPartyService.getAllCounterPartyTypes().subscribe({
      next: (res) => {
        console.log(res);
        this.counterPartyTypesData.set(res);
      },
      error: (e) => {
        console.log(e)
      }
    })
  }

  editCounterParty() {
  }

  deleteCounterParty() {
    this.isDeleting.set(true);
  }

}
