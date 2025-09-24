import { Component, computed, EventEmitter, output, Output, signal } from '@angular/core';
import { LucideAngularModule, X } from 'lucide-angular';
import { Stepper } from "../stepper/stepper";
import { AddCompanyInformation } from "../add-company-information/add-company-information";
import { AddPackageInformation } from "../add-package-information/add-package-information";
import { SupportCredentials } from "../support-credentials/support-credentials";
import { ReactiveFormsModule, FormBuilder, Validators, FormGroup } from '@angular/forms';

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

  close = output<void>()
  readonly closeIcon = X;

  // forms 
  companyForm: FormGroup;
  packageForm: FormGroup;

  constructor(private fb: FormBuilder) {
    this.companyForm = this.fb.group({
      organizationName: ['', Validators.required],
      industry: ['', Validators.required],
      orgUrlSlug: ['', [Validators.pattern(/^[a-z0-9-]+$/i)]],
      gst: ['', []],
      street: ['', Validators.required],
      zip: ['', [Validators.required, Validators.pattern(/^[0-9]{4,10}$/)]],
      country: ['', Validators.required],
      state: ['', Validators.required],
      currency: ['', Validators.required],
      timezone: ['', Validators.required],
      contactName: ['', Validators.required],
      contactEmail: ['', [Validators.required, Validators.email]],
      contactPhone: ['', [Validators.required, Validators.pattern(/^[\d+\-() ]{7,20}$/)]],
      teamSize: [''],
      website: ['', [Validators.pattern(/^https?:\/\/.+$/)]],
      logo: [null as File | null]
    });

    this.packageForm = this.fb.group({
      package: ['', Validators.required],
      usersCount: [20, [Validators.required, Validators.min(1)]],
      puc: [20000, [Validators.min(0)]],
      dealAmount: [null, [Validators.required, Validators.min(0)]],
      gst: [2000, [Validators.min(0)]],
      totalDealValue: [{ value: 410000, disabled: true }], // keep your initial value
      startDate: ['22-02-2025', [Validators.required]],
      validUpto: ['25-03-2026', [Validators.required]],
    });
  }

  // minimal: keep your method name, just guard with validation before next
  nextStep() {
    const step = this.currentStep();
    const valid = step === 0 ? this.companyForm.valid : step === 1 ? this.packageForm.valid : true;
    if (!valid) {
      (step === 0 ? this.companyForm : this.packageForm).markAllAsTouched();
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
    // minimal: keep your console + close behavior; just ensure both forms are valid
    if (!this.companyForm.valid || !this.packageForm.valid) {
      this.companyForm.markAllAsTouched();
      this.packageForm.markAllAsTouched();
      return;
    }
    console.log(this.companyForm.value);
    console.log(this.packageForm.value);
    this.close.emit();
  }

}
