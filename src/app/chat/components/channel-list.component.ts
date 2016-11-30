import { Component, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';

import { Channel } from '../models/channel.model';

@Component({
  selector: 'my-channel-list',
  styles: [`
    li {
      cursor: pointer;
      margin: 0 0 .5rem 0;
    }

    .selected {
      background-color: #1a64cb;
    }
  `],
  template: `
    <ul>
      <li *ngFor="let channel of channels"
          [ngClass]="{'selected': channel._id === channelId}"
          (click)="onSelectChannel(channel)">
        {{channel.name}}
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChannelListComponent {
  @Input() channels: Channel[];
  @Input() channelId: string;
  @Output() selectChannel = new EventEmitter<Channel>();

  onSelectChannel(channel: Channel) {
    this.selectChannel.emit(channel);
  }
}