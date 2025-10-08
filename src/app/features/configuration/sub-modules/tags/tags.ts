import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Modal } from '../../../../shared/components/ui/modal/modal';
import { Tagsservice } from './services/tag.service';
import { Tag } from './model/tags.model';
import { ToggleSwitch } from "../../../../shared/components/ui/toggle-switch/toggle-switch";
import { Card } from "../../../../shared/components/ui/card/card";
import { Button } from "../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../assets/icons/icons';
import { FormsModule } from '@angular/forms';

@Component({
  standalone: true,
  selector: 'app-tags',
  imports: [CommonModule, FormsModule, MatTableModule, Modal, ToggleSwitch, Card, Button, LucideAngularModule],
  templateUrl: './tags.html',
  styleUrls: ['./tags.css'],
})
export class Tags {


  icons = AppIcons;

  isAddingNewTag = signal<boolean>(false);
  isEditingTag = signal<boolean>(false);
  displayedColumns = ['actions', 'status', 'tagType', 'contractsTagged'];

  tagName = signal('test');

  tasService = inject(Tagsservice);
  tagsData = signal<Tag[]>([]);

  constructor() {
    this.loadTags();
  }



  addNewTag() {

    const payLoad = {
      "tagID": 0,
      "tagName": this.tagName(),
      "status": 0,
      "orgID": 1,
      "createdBy": 0,
      "createdDate": "2025-10-08T08:52:31.082Z",
      "modifidBy": 0,
      "modifiedDate": "2025-10-08T08:52:31.082Z"
    }
    this.tasService.addNewTag(payLoad).pipe(

    ).subscribe(res => {
      console.log(res)
      this.isAddingNewTag.set(false);
       this.loadTags();
    })
  }



  loadTags() {
    this.tasService.getTags(1).pipe(

    ).subscribe(res => {
      this.tagsData.set(res)
    })
  }
}
