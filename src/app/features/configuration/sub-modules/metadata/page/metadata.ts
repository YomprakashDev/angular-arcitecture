import { CommonModule } from '@angular/common';
import { ChangeDetectionStrategy, Component, DestroyRef, inject, OnInit, signal } from '@angular/core';
import { MatTableDataSource, MatTableModule } from '@angular/material/table';
import { MetadataPartyInformation } from '../components/metadata-party-information/metadata-party-information';
import { MetadataService } from '../services/metadata.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { ContractType } from '../models/metadata.model';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
type MetaRow = {
  contractType: string;
  contracts: string;      // keep as string to allow leading zeros (e.g., '04')
  lastUpdated: string;
};
@Component({
  standalone: true,
  selector: 'app-metadata',
  imports: [CommonModule, MatTableModule, MetadataPartyInformation],
  templateUrl: './metadata.html',
  styleUrls: ['./metadata.css'],
  changeDetection:ChangeDetectionStrategy.OnPush
})
export class Metadata implements OnInit {
  displayedColumns = ['contractType', 'contracts', 'lastUpdated'];

  rows: MetaRow[] = [
    { contractType: 'MSA', contracts: '04', lastUpdated: '05 Aug 2025 at 11:00 am' },
    { contractType: 'NDA', contracts: '12', lastUpdated: '03 Aug 2025 at 12:00 am' },
    { contractType: 'Employment Agreement', contracts: '02', lastUpdated: '05 Aug 2025 at 11:00 am' },
    { contractType: 'Others', contracts: '23', lastUpdated: '03 Aug 2025 at 12:00 am' },
  ];

    /** Page UI state. */
  readonly isLoading = signal(true);
  readonly error = signal<string | null>(null);

  metadataService = inject(MetadataService)
  /** Table data source  */
  readonly dataSource = new MatTableDataSource<ContractType>([]);
  private readonly destroyRef = inject(DestroyRef);

  /** Initial data load. */
    ngOnInit(): void {
      this.loadModules();
    }
  
    /**
     * Fetch modules and populate the table.
     */
    loadModules(): void {
  
      this.isLoading.set(true);
      this.error.set(null);
      this.metadataService
        .getMetadata(3001)
        .pipe(
          finalize(() => this.isLoading.set(false)),
          catchError((err) => {
            console.error('[ModulePage] load error:', err);
            this.error.set('Failed to load modules. Please try again.');
            this.dataSource.data = [];
            return EMPTY;
          }),
          takeUntilDestroyed(this.destroyRef),
        )
        .subscribe((res) => {
          this.dataSource.data = res ?? [];
  
        }
        );
    }

}
