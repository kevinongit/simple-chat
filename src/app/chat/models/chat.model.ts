export interface Message {
  _id: string,
  channelId: string,
  userId: string,
  userName?: string,
  content: string,
  timestamp: Date
}