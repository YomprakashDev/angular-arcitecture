import { HttpClient, provideHttpClient } from '@angular/common/http';
import { inject, Injectable } from '@angular/core';

/**
 * A service for managing sub-module-related data and operations.
 * This service will be responsible for fetching, creating, updating, and deleting sub-module data.
 */
@Injectable({
  providedIn: 'root'
})
export class SubModulesService {
  
  privatehttp = inject(HttpClient);
}
