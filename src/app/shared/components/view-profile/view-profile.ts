import { Component, signal } from '@angular/core';

@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-profile.html',
  styleUrls: ['./view-profile.css']
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
    this.isEditing.update(prev => !prev);
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
