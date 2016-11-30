import { ActionReducer, Action } from '@ngrx/store';

import { ProfileActions } from '../actions/profile.actions';

export interface ProfileState {
    _id: string,
    name: string
}

const initialState: ProfileState = {
    _id: '0',
    name: 'Jack'
};

export const profileReducer: ActionReducer<ProfileState> = (state = initialState, action: Action) => {
    switch (action.type) {
        case ProfileActions.PROFILE_UPDATE_PROFILE: {
            return Object.assign({}, state, {name: action.payload});
        }
        default: {
            return state;
        }
    }
};