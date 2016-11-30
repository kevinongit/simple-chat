import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { Message } from '../models/chat.model';
import { Channel } from '../models/channel.model';
import { ProfileService } from '../../profile/services/profile.service';

@Injectable()
export class ChatService {


  constructor(
    private profileService: ProfileService
  ) {}

  // fake database
  private channelsDb: Channel[] = [
    { _id: '0', name: 'general' },
    { _id: '1', name: 'channel1' }
  ];

  // fake database
  private messagesDb: Message[] = [
    { _id: '0', channelId: '0', userId: '0', userName: 'Jack', content: 'Hello!', timestamp: new Date() },
    { _id: '1', channelId: '0', userId: '0', userName: 'Jack', content: 'Hi!', timestamp: new Date() },
    { _id: '2', channelId: '1', userId: '0', userName: 'Jack', content: 'Hi again!', timestamp: new Date() }
  ];

  channels: Channel[] = [];
  messages: Message[] = [];

  channel: Channel;

  getChannels(): Observable<Channel[]> {

    return Observable.of(this.channelsDb);
  }

  getMessages(channelName: string): Observable<Message[]> {
    // fake API, get message data from the database
    let channelId = '';
    this.channelsDb.map(channel => {
      if (channel.name === channelName) {
        channelId = channel._id;
      }
    });

    const messages = [];
    this.messagesDb.map(message => {
      if (message.channelId === channelId) {
        messages.push(message);
      }
    });

    return Observable.of(messages);
  }

  // selectChannel(channel: Channel): void {
  //   this.channel = channel;
  //   this.getMessages(channel.name);
  // }

  addChannel(channelName: string): Observable<Channel> {
    const channel: Channel = {
      _id: String(this.channelsDb.length),
      name: channelName
    };

    this.channelsDb = [...this.channelsDb, channel];

    return Observable.of(channel);
  }

  sendMessage(channelId: string, messageContent: string): Observable<Message> {
    const message = {
      _id: String(this.messagesDb.length),
      channelId,
      userId: this.profileService.currentUser._id,
      userName: this.profileService.currentUser.name,
      content: messageContent,
      timestamp: new Date()
    };

    // fake API, write message data to the database
    this.messagesDb = [...this.messagesDb, message];

    return Observable.of(message);
  }
}