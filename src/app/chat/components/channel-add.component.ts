import { Component, OnInit, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';

@Component({
    selector: 'my-channel-add',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .wrapper {
         margin: .5rem;
        }
    `],
    template: `
        <div class="wrapper">
            <form [formGroup]="channelForm" (ngSubmit)="onAddChannel()">
                <input formControlName="name" placeholder="add channel" />
            </form>
        </div>
    `
})
export class ChannelAddComponent implements OnInit {
    @Output() addChannel = new EventEmitter<string>();

    channelForm: FormGroup;

    constructor(
        private fb: FormBuilder
    ) {}

    ngOnInit() {
        this.channelForm = this.fb.group({
            name: ['', Validators.required]
        });
    }

    private onAddChannel() {
        if (!this.channelForm.valid) return;

        this.addChannel.emit(this.channelForm.value.name);
        this.channelForm.reset();
    }

}