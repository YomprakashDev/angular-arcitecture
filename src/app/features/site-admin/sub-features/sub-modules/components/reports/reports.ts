import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-reports',
  templateUrl: './reports.html',
  styleUrls: ['./reports.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ReportsComponent {}
