import { ProfileState } from '../../profile/reducers/profile.reducer';
import { ChatState } from '../../chat/reducers/chat.reducer';

export interface State {
    profile: ProfileState;
    chat: ChatState;
}