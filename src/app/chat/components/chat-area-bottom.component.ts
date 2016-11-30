import { Component, OnInit, Input, Output, EventEmitter, ChangeDetectionStrategy } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

@Component({
  selector: 'my-chat-area-bottom',
  styles: [`
    .wrapper {
      padding: 0 .5rem;
      bottom: 1rem;
      position: fixed;
    }

    input {
      width: 70vw;
    }
  `],
  template: `
    <div class="wrapper">
      <form [formGroup]="messageForm" (ngSubmit)="onSendMessage()">
        <input formControlName="message" placeholder="Click enter to send"/>
      </form>
    </div>
  `,
  changeDetection: ChangeDetectionStrategy.OnPush
})
export class ChatAreaBottomComponent implements OnInit {
  @Input() channelId: string;
  @Output() sendMessage = new EventEmitter<any>();

  messageForm: FormGroup;

  constructor(
    private fb: FormBuilder
  ) {}

  ngOnInit() {
    this.messageForm = this.fb.group({
      message: ['', Validators.required]
    });
  }

  onSendMessage() {
    if (!this.messageForm.valid) return;

    this.sendMessage.emit({ channelId: this.channelId, messageContent: this.messageForm.value.message });

    this.messageForm.reset();
  }
}