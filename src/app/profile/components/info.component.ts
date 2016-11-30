import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'my-info',
    changeDetection: ChangeDetectionStrategy.OnPush,
    template: `
        <form [formGroup]="profileForm" (ngSubmit)="onUpdateProfile()">
            <label>Name</label>
            <input formControlName="name" placeholder="name" />
            <button type="submit">Save changes</button>
        </form>
    `
}) 
export class InfoComponent implements OnInit {
    @Input() name: string;
    @Output() updateProfile = new EventEmitter<string>();

    profileForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.profileForm = this.fb.group({
            name: [this.name, Validators.required]
        });
    }

    private onUpdateProfile() {
        if (!this.profileForm.valid) return;
        this.updateProfile.emit(this.profileForm.value.name);
    }
}