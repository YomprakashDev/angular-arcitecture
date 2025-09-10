import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  imports: [],
  templateUrl: './view-profile.html',
  styleUrl: './view-profile.css'
})
export class ViewProfile {
initialUser = {
    firstName: 'Virat',
    lastName: 'Sharma',
    department: 'Manager',
    mobileNumber: '8569456213',
    email: 'Virat196@cmp.in',
    designation: 'Manager'
  };

  user = signal({ ...this.initialUser });
  isEditing = signal(false);

  toggleEdit() {
    this.isEditing.set(!this.isEditing());
  }

  saveUser() {
    console.log('Saving user data:', this.user());
    this.initialUser = { ...this.user() };
    this.isEditing.set(false);
  }

  cancelEdit() {
    this.user.set({ ...this.initialUser });
    this.isEditing.set(false);
  }
}
