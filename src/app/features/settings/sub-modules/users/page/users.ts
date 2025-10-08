import { Component, DestroyRef, effect, inject, signal } from '@angular/core';
import { Card } from "../../../../../shared/components/ui/card/card";
import { Button } from "../../../../../shared/components/ui/button/button";
import { LucideAngularModule } from "lucide-angular";
import { AppIcons } from '../../../../../../assets/icons/icons';
import { Tab, Tabs } from '../../../../../shared/components/tabs/tabs';
import { CommonModule } from '@angular/common';
import { UserService } from '../services/user.service';
import { catchError, EMPTY, finalize } from 'rxjs';
import { takeUntilDestroyed } from '@angular/core/rxjs-interop';
import { Role, User } from '../model/user.model';
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
  private destroyRef = inject(DestroyRef);
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


  // tabs + UI flags
  readonly tabs = signal<Tab[]>([
    { id: 'active', label: 'Active' },
    { id: 'inactive', label: 'Inactive' },
  ]);

  isNewUserAdding = signal(false);

  roles = signal<Role[]>([]);
  rolesLoading = signal(false);
  rolesError = signal<string | null>(null);

  users = signal<User[]>([]);

  addUser() {
    this.isNewUserAdding.set(true);

  }

  loadRoles() {
    console.log('[loadRoles] called');
    // optional: prevent duplicate in-flight calls
    if (this.rolesLoading()) {
      console.log('[loadRoles] already loading, skip');
      return;
    }

    this.rolesLoading.set(true);
    this.rolesError.set(null);

    this.userService.getRoles().pipe(
      takeUntilDestroyed(this.destroyRef),              // ok in components
      catchError((err) => {
        console.error('[loadRoles] error:', err);
        this.rolesError.set(err?.message ?? 'Failed to load roles');
        return EMPTY;                       // swallow error so finalize still runs
      }),
      finalize(() => {
        console.log('[loadRoles] finalize -> set loading false');
        this.rolesLoading.set(false);
      }),
    ).subscribe((res) => {
      console.log('[loadRoles] success:', res);
      this.roles.set(res ?? []);
    });
  }
  constructor() {
    this.loadUsers();

    effect(() => {
      const open = this.isNewUserAdding();
      console.log('[effect] isNewUserAdding =', open);
      if (!open) return;

      // fetch roles only the first time; remove this guard to fetch every open
      if (this.roles().length) {
        console.log('[effect] roles already loaded, skipping fetch');
        return;
      }

      this.loadRoles();
    });
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
