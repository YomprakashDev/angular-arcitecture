import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-contracts-page',
  template: '<p>Contracts Page Works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ContractsPageComponent {}
