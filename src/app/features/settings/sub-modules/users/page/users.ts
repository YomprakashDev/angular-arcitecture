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



@Component({
  selector: 'app-users',
  imports: [Card,CommonModule, Button, LucideAngularModule, Tabs],
  templateUrl: './users.html',
  styleUrl: './users.css'
})
export class Users {
icons = AppIcons;

activeTab = signal('active');

setActiveTab(tabId: string) {
  this.activeTab.set(tabId);
}

userService = inject(UserService);
isLoading = signal(true);
error = signal<string | null>(null);

addUser() {}
  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);


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
      
      console.log(this.users);
      })
    
  }

}
