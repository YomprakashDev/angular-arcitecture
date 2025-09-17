import { ChangeDetectionStrategy, Component } from '@angular/core';

@Component({
  selector: 'app-workflow',
  standalone: true,
  imports: [],
  templateUrl: './workflow.component.html',
  styleUrls: ['./workflow.component.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class WorkflowComponent {}
