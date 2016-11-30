import { Injectable } from '@angular/core';
import { Effect, Actions } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';

import { ChatActions } from '../actions/chat.actions';
import { ChatService } from '../services/chat.service';

@Injectable()
export class ChatEffects {
    constructor(
        private actions$: Actions,
        private chatService: ChatService
    ) {}

    @Effect() getChannels$ = this.actions$
        .ofType(ChatActions.CHAT_GET_CHANNELS)
        .switchMap(() => this.chatService.getChannels()
            .map(channels => ({type: ChatActions.CHAT_GET_CHANNELS_SUCCESS, payload: channels}))
            .catch(error => Observable.of({type: ChatActions.CHAT_GET_CHANNELS_FAIL, payload: error}))
        );

    @Effect() addChannel$ = this.actions$
        .ofType(ChatActions.CHAT_ADD_CHANNEL)
        .map(action => action.payload)
        .mergeMap(channelName => this.chatService.addChannel(channelName)
            .map(channel => ({type: ChatActions.CHAT_ADD_CHANNEL_SUCCESS, payload: channel}))
            .catch(error => Observable.of({type: ChatActions.CHAT_ADD_CHANNEL_FAIL, payload: error}))
        );

    @Effect() getMessages$ = this.actions$
        .ofType(ChatActions.CHAT_GET_MESSAGES)
        .map(action => action.payload)
        .switchMap(channelName => this.chatService.getMessages(channelName)
            .map(messages => ({type: ChatActions.CHAT_GET_MESSAGES_SUCCESS, payload: messages}))
            .catch(error => Observable.of({type: ChatActions.CHAT_GET_MESSAGES_FAIL, payload: error}))
        );
    
    @Effect() sendMessage$ = this.actions$
        .ofType(ChatActions.CHAT_SEND_MESSAGE)
        .map(action => action.payload)
        .mergeMap(({channelId, messageContent}) => this.chatService.sendMessage(channelId, messageContent)
            .map(message => ({type: ChatActions.CHAT_SEND_MESSAGE_SUCCESS, payload: message}))
            .catch(error => Observable.of({type: ChatActions.CHAT_SEND_MESSAGE_FAIL, payload: error}))
        );

}