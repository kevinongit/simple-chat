import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Subscription } from 'rxjs/Subscription';
import { Store } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { Channel } from '../models/channel.model';
import { ProfileState } from '../../profile/reducers/profile.reducer';
import { ChatState } from '../../chat/reducers/chat.reducer';
import { ChatActions } from '../../chat/actions/chat.actions';
import { State } from '../../shared/models/state.model';

@Component({
  selector: 'my-chat',
  styles: [`
    .left {
      width: 20%;
      float: left;
      background: #2b78e4;
      height: 100vh;
      color: #c5d5df;
    }

    .right {
      width: 80%;
      float: right;
    }
  `],
  template: `
    <div class="left">
      <my-channel-header
        [name]="(profileModel$ | async)?.name"
        (goProfile)="onGoProfile()">
      </my-channel-header>

      <my-channel-list
        [channels]="(chatModel$ | async)?.channels"
        [channelId]="(chatModel$ | async)?.channel._id"
        (selectChannel)="onSelectChannel($event)">
      </my-channel-list>

      <my-channel-add
        (addChannel)="onAddChannel($event)">
      </my-channel-add>
    </div>

    <div class="right">
      <my-chat-area-header
        [channelName]="(chatModel$ | async)?.channel.name">
      </my-chat-area-header>

      <my-chat-area-dialog
        [messages]="(chatModel$ | async)?.messages">
      </my-chat-area-dialog>
      
      <my-chat-area-bottom
        [channelId]="(chatModel$ | async)?.channel._id"
        (sendMessage)="onSendMessage($event)">
      </my-chat-area-bottom>
    </div>
  `,
})
export class ChatComponent implements OnInit, OnDestroy {
  subsParams: Subscription;
  profileModel$: Observable<ProfileState>;
  chatModel$: Observable<ChatState>;

  constructor(
    private router: Router,
    private route: ActivatedRoute,

    private store: Store<State>
  ) {}

  ngOnInit() {

    this.profileModel$ = this.store.select<ProfileState>('profile');
    this.chatModel$ = this.store.select<ChatState>('chat');

    this.store.dispatch({type: ChatActions.CHAT_GET_CHANNELS});
    
    this.subsParams = this.route.params.subscribe(params => {
      const channelName = params['name'];
      console.log('ChatComponent - channelName = ', channelName);

      this.store.dispatch({type: ChatActions.CHAT_GET_MESSAGES, payload: channelName});
    });
  }

  ngOnDestroy() {
    this.subsParams.unsubscribe();
  }

  onSelectChannel(channel: Channel) {
    this.store.dispatch({type: ChatActions.CHAT_SELECT_CHANNEL, payload: channel});
    this.router.navigate(['/channel', channel.name]);
  }

  onSendMessage({ channelId, messageContent }) {
    this.store.dispatch({type: ChatActions.CHAT_SEND_MESSAGE, payload: {channelId, messageContent}});
  }

  onGoProfile() {
    this.router.navigate(['/profile']);
  }

  onAddChannel(channelName: string): void {
    this.store.dispatch({type:ChatActions.CHAT_ADD_CHANNEL, payload: channelName});
  }
}