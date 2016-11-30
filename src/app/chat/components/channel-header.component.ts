import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'my-channel-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .wrapper {
            margin: 1rem;
            color: #C5D5DF;
        }

        .name {
            cursor: pointer;
        }
    `],
    template: `
        <div class="wrapper">
            <h3 class="name" (click)="onGoProfile()"> {{name}} </h3>
        </div>
    `
})
export class ChannelHeaderComponent {
    @Input() name: string;
    @Output() goProfile = new EventEmitter<void>();

    private onGoProfile() {
        this.goProfile.emit(null);
    }
}