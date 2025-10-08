import { CommonModule } from '@angular/common';
import { Component, inject, signal } from '@angular/core';
import { MatTableModule } from '@angular/material/table';
import { Modal } from '../../../../shared/components/ui/modal/modal';
import { Tagsservice } from './services/tag.service';
import { EditTagPayload, Tag } from './model/tags.model';
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
  // track which tag is being edited
  editingTagId = signal<number | null>(null);

  isAddingNewTag = signal<boolean>(false);
  isEditingTag = signal<boolean>(false);
  displayedColumns = ['actions', 'status', 'tagType', 'contractsTagged'];

  tagName = signal('test');
  editedTagName = signal('')
  tagsServices = inject(Tagsservice);
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
      "createdBy": 1,
      "createdDate": "2025-10-08T08:52:31.082Z",
      "modifidBy": 1,
      "modifiedDate": "2025-10-08T08:52:31.082Z"
    }
    this.tagsServices.addNewTag(payLoad).pipe(

    ).subscribe(res => {
      console.log(res)
      this.isAddingNewTag.set(false);
      this.loadTags();
      
    })
  }

  loadTags() {
    this.tagsServices.getTags(1).pipe(

    ).subscribe(res => {
      this.tagsData.set(res)
    })
  }

  editTag(r: Tag) {
    console.log(r);
    this.editingTagId.set(r.tagID);
    this.editedTagName.set(r.tagName);
    this.isEditingTag.set(true);
  }

  saveEditedTag() {
    const id = this.editingTagId();
    const currenTag = this.tagsData().find(each => each.tagID === id);
    
    const payLoad:EditTagPayload  = {
      tagID: Number(this.editingTagId()),
      tagName: this.editedTagName(),
      modifidBy:0,
      orgID:1,
      createdDate: "2025-10-08T08:52:31.083",
      modifiedDate:"2025-10-08T00:00:00"
    };

    this.tagsServices.editTag(payLoad).subscribe(res => {
      console.log(res);
      this.editingTagId.set(null);
      this.isEditingTag.set(false);
      this.loadTags();
    })

  }

}
