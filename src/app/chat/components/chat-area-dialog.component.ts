import { Component, Input, ChangeDetectionStrategy } from '@angular/core';

import { Message } from '../models/chat.model';

@Component({
  selector: 'my-chat-area-dialog',
  styles: [`
    .wrapper {
      list-style-type: none;
      padding: 0 .5rem;
      height: 80vh;
      overflow: scroll;
    }

    .name {
      font-weight: bold;
    }

    .timestamp {
      color: #aaa;
    }
  `],
  template: `
    <ul class="wrapper">
      <li *ngFor="let message of messages">
        <p><span class="name">{{message.userName}}</span> <span class="timestamp">{{message.timestamp | calendar}}</span></p>
        <p>{{message.content}}</p>
      </li>
    </ul>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAreaDialogComponent {
  @Input() messages: Message[];
}