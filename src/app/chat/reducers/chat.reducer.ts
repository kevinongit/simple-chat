import { ActionReducer, Action } from '@ngrx/store';

import { ChatActions } from '../actions/chat.actions';
import { Channel } from '../models/channel.model';
import { Message } from '../models/chat.model';

export interface ChatState {
    channels: Channel[];
    channel?: Channel;
    messages: Message[];
};

const initialState: ChatState = {
    channels: [],
    channel: null,
    messages: []
};

export const chatReducer: ActionReducer<ChatState> = (state = initialState, action: Action) => {
    switch (action.type) {
        case ChatActions.CHAT_GET_CHANNELS_SUCCESS: {
            return Object.assign({}, state, {channels: action.payload, channel: action.payload[0]});
        }
        case ChatActions.CHAT_ADD_CHANNEL_SUCCESS: {
            return Object.assign({}, state, {channels: [...state.channels, action.payload]});
        }
        case ChatActions.CHAT_GET_MESSAGES_SUCCESS: {
            return Object.assign({},state, {messages: action.payload});
        }
        case ChatActions.CHAT_SEND_MESSAGE_SUCCESS: {
            return Object.assign({}, state, {messages: [...state.messages, action.payload]});
        }
        case ChatActions.CHAT_SELECT_CHANNEL: {
            return Object.assign({}, state, {channel: action.payload});
        }
        default: {
            return state;
        }
    }
}