import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-library',
  templateUrl: './library.html',
  styleUrls: ['./library.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class LibraryComponent {}
