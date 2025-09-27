import { CommonModule } from '@angular/common';
import { Component } from '@angular/core';
import { MatTableModule } from '@angular/material/table';

type MetaRow = {
  contractType: string;
  contracts: string;      // keep as string to allow leading zeros (e.g., '04')
  lastUpdated: string;
};
@Component({
  standalone: true,
  selector: 'app-metadata',
  imports: [ CommonModule, MatTableModule ],
  templateUrl: './metadata.html',
  styleUrls: ['./metadata.css'],
})
export class Metadata {
displayedColumns = ['contractType', 'contracts', 'lastUpdated'];

  rows: MetaRow[] = [
    { contractType: 'MSA',                   contracts: '04', lastUpdated: '05 Aug 2025 at 11:00 am' },
    { contractType: 'NDA',                   contracts: '12', lastUpdated: '03 Aug 2025 at 12:00 am' },
    { contractType: 'Employment Agreement',  contracts: '02', lastUpdated: '05 Aug 2025 at 11:00 am' },
    { contractType: 'Others',                contracts: '23', lastUpdated: '03 Aug 2025 at 12:00 am' },
  ];

}
