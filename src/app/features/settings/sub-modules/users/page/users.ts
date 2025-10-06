import { Component, inject, signal } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Tab, Tabs } from '../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { User } from '../model/user.model';
import { Modal } from "../../../../../shared/components/ui/modal/modal";
import { FormsModule } from '@angular/forms';



@Component({
  selector: 'app-users',
  imports: [Card, FormsModule, CommonModule, Button, LucideAngularModule, Tabs, Modal],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
  icons = AppIcons;

  fullName = signal('');
  jobTitle = signal('');
  email = signal('');
  role = signal('');
  team = signal('')

  activeTab = signal('active');

  setActiveTab(tabId: string) {
    this.activeTab.set(tabId);
  }

  userService = inject(UserService);
  isLoading = signal(true);
  error = signal<string | null>(null);

  addUser() {
    this.isNewUserAdding.set(true);
  }
  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);

  isNewUserAdding = signal(false);

  users = signal<User[]>([]);

  constructor() {
    this.loadUsers();
  }

  loadUsers() {
    this.userService.getUsers().pipe(
      catchError((err) => {
        this.error.set(err.message);
        return EMPTY;
      }),
      finalize(() => this.isLoading.set(false)),
      takeUntilDestroyed()
    ).subscribe((res) => {
      this.users.set(res);
    })

  }

  saveNewUser() {
    const payload = {
      "fullName": "John Doe",
      "emailID": "john.doe@example.com",
      "phoneNumber": "+91-9876543210",
      "roleId": 3,
      "teamID": 13,
      "modifiedDate": "2025-10-06T05:42:39.373Z"
    }
    this.userService.addNewUser(payload).pipe().subscribe(res => console.log(res))
  }

}
