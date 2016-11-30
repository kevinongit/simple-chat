import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

@Component({
    selector: 'my-chat-area-header',
    changeDetection: ChangeDetectionStrategy.OnPush,
    styles: [`
        .wrapper {
            padding: 0 .5rem;
        }
    `],
    template: `
        <div class="wrapper">
            <h3># {{channelName}}</h3>
        </div>
    `
})
export class ChatAreaHeaderComponent {
    @Input() channelName: string;
}