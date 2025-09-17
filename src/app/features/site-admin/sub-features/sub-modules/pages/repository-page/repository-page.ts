import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-repository-page',
  template: '<p>Repository Page Works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class RepositoryPageComponent {}
