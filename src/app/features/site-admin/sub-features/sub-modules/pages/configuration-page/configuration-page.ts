import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuration-page',
  template: '<p>Configuration Page Works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ConfigurationPageComponent {}
