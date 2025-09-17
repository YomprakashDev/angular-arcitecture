import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-configuration',
  templateUrl: './configuration.html',
  styleUrls: ['./configuration.css'],
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ConfigurationComponent {}
