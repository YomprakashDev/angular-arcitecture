import { Component, computed, inject, output,  signal } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Stepper } from "../stepper/stepper";
import { AddCompanyInformation } from "../add-company-information/add-company-information";
import { AddPackageInformation } from "../add-package-information/add-package-information";
import { SupportCredentials } from "../support-credentials/support-credentials";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';
import { CreateOrganizationRequest } from '../../models/organization.model';
import { OrganizationService } from '../../services/organization.service';

@Component({
  selector: 'app-add-oraganization-model',
  imports: [LucideAngularModule, Stepper, AddCompanyInformation, ReactiveFormsModule, AddPackageInformation, SupportCredentials],
  templateUrl: './add-oraganization-model.html',
  styleUrl: './add-oraganization-model.css'
})
export class AddOraganizationModel {
  // steps
  currentStep = signal<number>(0);
  stepLabels = ['Company Information', 'Package Information', 'Support Credentials'];
  isLastStep = computed(() => this.currentStep() === this.stepLabels.length - 1);
  isFirstStep = computed(() => this.currentStep() === 0);

  organizationService = inject(OrganizationService);
  close = output<void>()
  readonly closeIcon = X;

  // forms 
  organizationForm: FormGroup;
  packageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    const nowIso = new Date().toISOString();

    this.organizationForm = this.fb.group({
      modifiedBy: [0],
      modifiedDate: [nowIso, Validators.required],
      timeZone: ['', Validators.required],
      webURL: ['', []],
      address: ['', Validators.required],
      createdDate: [nowIso, Validators.required],
      organizationID: [0],
      organization: ['', Validators.required],
      organizationCode: [''],
      logo: [''],
      emailID: ['', [Validators.required, Validators.email]],
      industry: [null as number | null, [Validators.required, Validators.min(1)]],
      gstNumber: [''],
      zipCode: ['', [Validators.required, Validators.pattern(/^\d{4,10}$/)]],
      countryID: [null as number | null, Validators.required],
      stateID: [null as number | null, Validators.required],
      contactPersonName: ['', Validators.required],
      contactNumber: ['', [Validators.required, Validators.pattern(/^[\d+\-() ]{7,20}$/)]],
      currency: [null as number | null, Validators.required],
      status: [1],
      createdBy: [0],
    });

    this.packageForm = this.fb.group({
      validFrom: [nowIso, Validators.required],
      validTo: [nowIso, Validators.required],
      organizationID: [0],
      packageID: [null as number | null, [Validators.required, Validators.min(1)]],
      status: [1],
      noOfUsers: [20, [Validators.required, Validators.min(1)]],
      puc: [20000, [Validators.min(0)]],
      dealAmount: [null, [Validators.required, Validators.min(0)]],
      gst: [2000, [Validators.min(0)]],
      createdBy: [0],
      createdDate: [nowIso, Validators.required],
      modifiedBy: [0],
      modifiedDate: [nowIso, Validators.required],
      organizationPackageID: [0],
    });
  }


  nextStep() {
    const step = this.currentStep();
    const valid = step === 0 ? this.organizationForm.valid : step === 1 ? this.packageForm.valid : true;
    if (!valid) {
      (step === 0 ? this.organizationForm : this.packageForm).markAllAsTouched();
      return;
    }
    this.currentStep.update(i => i + 1);
  }

  prevStep() {
    if (this.currentStep() > 0) this.currentStep.update(i => i - 1);
  }

  closeModal() {
    this.close.emit();
  }


  save() {

    const org = { ...this.organizationForm.value };
    const pkg = { ...this.packageForm.value };

    if (typeof org.logo !== 'string') {
      org.logo = '';
    }
    // 2) Convert date-only (yyyy-MM-dd) to ISO
    const toIso = (v: string) => (v && v.includes('T') ? v : new Date(v).toISOString());

    org.createdDate = toIso(org.createdDate);
    org.modifiedDate = toIso(org.modifiedDate);
    pkg.createdDate = toIso(pkg.createdDate);
    pkg.modifiedDate = toIso(pkg.modifiedDate);
    pkg.validFrom = toIso(pkg.validFrom);
    pkg.validTo = toIso(pkg.validTo);

    // minimal: keep your console + close behavior; just ensure both forms are valid
    if (!this.organizationForm.valid || !this.packageForm.valid) {
      this.organizationForm.markAllAsTouched();
      this.packageForm.markAllAsTouched();
      return;
    }

    const payload: CreateOrganizationRequest = { organization: org, package: pkg };
    this.organizationService.addNewOrganization(payload).subscribe({
      next: (res) => {
        console.log('Created organization:', res);
        this.close.emit();
      },
      error: (err) => {
        console.error('Create org failed:', err);
      }
    });
  }

}
