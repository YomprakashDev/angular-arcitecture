import { ChangeDetectionStrategy, Component, signal } from '@angular/core';

/**
 * A component for viewing and editing a user's profile.
 */
@Component({
  selector: 'app-view-profile',
  standalone: true,
  imports: [],
  templateUrl: './view-profile.html',
  styleUrls: ['./view-profile.css'],
  changeDetection: ChangeDetectionStrategy.OnPush,
})
export class ViewProfile {
  /**
   * The initial user data.
   * This is used to reset the form when the user cancels an edit.
   */
  initialUser = {
    firstName: 'Virat',
    lastName: 'Sharma',
    department: 'Manager',
    mobileNumber: '8569456213',
    email: 'Virat196@cmp.in',
    designation: 'Manager'
  };

  /**
   * The user's profile data.
   * This is a signal, so changes to this property will automatically update the view.
   */
  user = signal({ ...this.initialUser });
  /**
   * A signal to track whether the component is in edit mode.
   */
  isEditing = signal(false);

  /**
   * Toggles the `isEditing` signal.
   */
  toggleEdit() {
    this.isEditing.update(prev => !prev);
  }

  /**
   * Saves the user's data and exits edit mode.
   */
  saveUser() {
    console.log('Saving user data:', this.user());
    this.initialUser = { ...this.user() };
    this.isEditing.set(false);
  }

  /**
   * Cancels the edit and resets the user's data to the initial state.
   */
  cancelEdit() {
    this.user.set({ ...this.initialUser });
    this.isEditing.set(false);
  }
}
