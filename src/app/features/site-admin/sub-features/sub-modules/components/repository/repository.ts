import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-repository',
  templateUrl: './repository.html',
  styleUrls: ['./repository.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class RepositoryComponent {}
