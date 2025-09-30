import { Component, signal } from '@angular/core';
import { Tabs } from "../../../../../../../shared/components/tabs/tabs";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../../../assets/icons/icons';
import { SetupQuestionnaire } from "../setup-questionnaire/setup-questionnaire";
import { UploadTemplate } from "../upload-template/upload-template";
import { Approvals } from "../approvals/approvals";

@Component({
  selector: 'app-agreement-workflow',
  imports: [Tabs, LucideAngularModule, SetupQuestionnaire, UploadTemplate, Approvals],
  templateUrl: './agreement-workflow.html',
  styleUrl: './agreement-workflow.css'
})
export class AgreementWorkflow {
tabs = signal([
    { id: 'setup questionnaire', label: 'Set Up Questionnaire' },
    { id: 'upload template', label: 'Upload Template Document' },
    { id: 'approvals', label: 'Approvals' },
   
  ]);

  icons = AppIcons;

  activeTab = signal<string | null>('setup questionnaire');

  tabChanged(tabId: string) {
    this.activeTab.set(tabId);
  }
}
