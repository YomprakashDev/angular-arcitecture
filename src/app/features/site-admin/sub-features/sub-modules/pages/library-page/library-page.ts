import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-library-page',
  template: '<p>Library Page Works!</p>',
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class LibraryPageComponent {}
