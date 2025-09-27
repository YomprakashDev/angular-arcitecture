import { CommonModule } from '@angular/common';
import { Component, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MatPaginator, MatPaginatorModule } from '@angular/material/paginator';
import { MatSort, MatSortModule } from '@angular/material/sort';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatSelectModule } from '@angular/material/select';
import { MatButtonModule } from '@angular/material/button';
import { MatTooltipModule } from '@angular/material/tooltip';
import { Modal } from "../../../../../shared/components/ui/modal/modal";
import { CounterpartyForm } from "../../components/counterparty-form/counterparty-form";
import { ConfirmDialog } from "../../../../../shared/components/ui/confirm-dialog/confirm-dialog";

type CounterpartyType = 'Vendor' | 'Client' | 'Partner';

interface Counterparty {
  name: string;
  link?: string;
  type: CounterpartyType;
  address: string;
  city: string;
  state: string;
  country: string;
  contactName: string;
  contactNumber: string;
}
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
    MatTooltipModule, Modal, CounterpartyForm, ConfirmDialog],
  templateUrl: './counter-party.html',
  styleUrls: ['./counter-party.css']
})
export class CounterParty {
  // --- Filters (static for this mock) ---
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


  dataSource = new MatTableDataSource<Counterparty>([
    { name: 'Acme Corp', link: '#', type: 'Vendor', address: '123 Main Street', city: 'Austin', state: 'TX', country: 'USA', contactName: 'John Doe', contactNumber: '7932986841' },
    { name: 'Nova Health', link: '#', type: 'Client', address: '5 Park Ave', city: 'New York', state: 'NY', country: 'USA', contactName: 'Antony', contactNumber: '9858752465' },
    { name: 'InnoTech Pvt Ltd', link: '#', type: 'Partner', address: '22 MG Road', city: 'Mumbai', state: 'MH', country: 'India', contactName: 'Rajeev varma', contactNumber: '8626167684' },
    { name: 'Nova Health', link: '#', type: 'Client', address: '5 Park Ave', city: 'New York', state: 'NY', country: 'USA', contactName: 'Antony', contactNumber: '8090522110' },
    { name: 'Acme Corp', link: '#', type: 'Vendor', address: '123 Main Street', city: 'Austin', state: 'TX', country: 'USA', contactName: 'John Doe', contactNumber: '6752970474' },
  ]);

  readonly allRows = signal<Counterparty[]>([
    {
      name: 'Acme Corp',
      link: '#',
      type: 'Vendor',
      address: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      contactName: 'John Doe',
      contactNumber: '7932986841',
    },
    {
      name: 'Nova Health',
      link: '#',
      type: 'Client',
      address: '5 Park Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      contactName: 'Antony',
      contactNumber: '9858752465',
    },
    {
      name: 'InnoTech Pvt Ltd',
      link: '#',
      type: 'Partner',
      address: '22 MG Road',
      city: 'Mumbai',
      state: 'MH',
      country: 'India',
      contactName: 'Rajeev varma',
      contactNumber: '8626167684',
    },
    {
      name: 'Nova Health',
      link: '#',
      type: 'Client',
      address: '5 Park Ave',
      city: 'New York',
      state: 'NY',
      country: 'USA',
      contactName: 'Antony',
      contactNumber: '8090522110',
    },
    {
      name: 'Acme Corp',
      link: '#',
      type: 'Vendor',
      address: '123 Main Street',
      city: 'Austin',
      state: 'TX',
      country: 'USA',
      contactName: 'John Doe',
      contactNumber: '6752970474',
    },
  ]);


  // --- UI state  ---
  readonly selectedType = signal<string>('');
  readonly selectedCountry = signal<string>('');
  readonly search = signal<string>('');
  isAdding = signal(false);
  isDeleting = signal(false);
  addCounterParty() {
    this.isAdding.set(true);
  }

  editCounterParty(){
    
  }

  deleteCounterParty() {
    this.isDeleting.set(true);
  }

}
