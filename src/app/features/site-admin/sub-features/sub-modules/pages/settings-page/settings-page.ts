import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-settings-page',
  template: '<p>Settings Page Works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class SettingsPageComponent {}
