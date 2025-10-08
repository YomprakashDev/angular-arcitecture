import { CommonModule } from '@angular/common';
import { Component, computed, output, signal } from '@angular/core';
import { FormBuilder, ReactiveFormsModule, Validators } from '@angular/forms';
import { OrgFirmDto } from '../../services/firm.service';

@Component({
  selector: 'app-add-firm',
  imports: [ReactiveFormsModule, CommonModule],
  templateUrl: './add-firm.html',
  styleUrl: './add-firm.css'
})
export class AddFirm {

  submitted = output<OrgFirmDto>(); 
  private fb = new FormBuilder();

  // dropdown 
  jurisdictions = ['India', 'USA', 'UK', 'UAE', 'Singapore'];
  companyTypes = [
    { id: 1, name: 'Private Limited Company' },
    { id: 2, name: 'Public Limited Company' },
    { id: 3, name: 'Limited Liability Partnership' }
  ];

  // file state
  logoPreview = signal<string | null>(null);
  logoBase64 = signal<string | null>(null);
  fileError = signal<string | null>(null);

  form = this.fb.group({
    firmName: ['', Validators.required],
    firmincorporated: ['', Validators.required],
    companyType: [null as number | null, Validators.required],
    address: ['', Validators.required],
    country: ['', Validators.required],
    city: ['', Validators.required],
    state: ['', Validators.required],
    zIpCode: ['', Validators.required],
    timeZone: ['UTC +05:30'],
    primary: [false],
    emailLogo: ['']
  });

  // derived disabled state
  canSubmit = computed(() => this.form.valid && !this.fileError());

  async onFileChange(ev: Event) {
    const input = ev.target as HTMLInputElement;
    const file = input.files?.[0];
    this.fileError.set(null);
    this.logoPreview.set(null);
    this.logoBase64.set(null);

    if (!file) return;

    const allowed = ['image/png', 'image/jpeg'];
    const maxBytes = 1 * 1024 * 1024;

    if (!allowed.includes(file.type)) {
      this.fileError.set('Only PNG or JPEG allowed.');
      return;
    }
    if (file.size > maxBytes) {
      this.fileError.set('Max file size is 1 MB.');
      return;
    }

    // preview + base64
    const reader = new FileReader();
    reader.onload = () => {
      const res = reader.result as string;
      this.logoPreview.set(res);
      this.logoBase64.set(res);
    };
    reader.readAsDataURL(file);
  }


  // 👇 parent will call this
  submitFromParent() {
    if (this.form.invalid) { this.form.markAllAsTouched(); return; }
    const v = this.form.value;
    this.submitted.emit({
      firmID: 0,
      firmName: v.firmName!,
      firmincorporated: v.firmincorporated!,
      companyType: Number(v.companyType),
      address: v.address!,
      zIpCode: v.zIpCode!,
      status: v.primary ? 1 : 0,
      orgID: 1,
      timeZone: v.timeZone || 'UTC +05:30',
      formateDate: new Date().toISOString(),
      logo: null,
      createdBy: 1,
      createdDate: new Date().toISOString(),
      modifiedBy: 1,
      modifiedDate: new Date().toISOString()
    });
  }
}
