import { Injectable } from '@angular/core';
import { Effect, Actions, toPayload } from '@ngrx/effects';
import { Action } from '@ngrx/store';
import { Observable } from 'rxjs/Observable';


import { ProfileActions } from '../actions/profile.actions';
import { ProfileService } from '../services/profile.service';

@Injectable()
export class ProfileEffects {
    constructor(
        private actions$: Actions,
        private profileService: ProfileService 
    ) {}

    @Effect() updateProfile$ = this.actions$
        .ofType( ProfileActions.PROFILE_UPDATE_PROFILE )
        .map(action => action.payload)
        .switchMap(name => this.profileService.updateProfile(name)
            .map(name => ({ type: ProfileActions.PROFILE_UPDATE_PROFILE_SUCCESS, payload: name }))
            .catch(error => Observable.of({type: ProfileActions.PROFILE_UPDATE_PROFILE_FAIL, payload: error}))
        );
    // original version with bug fix.
    // @Effect() updateProfile$ = this.actions$
    //     .ofType( ProfileActions.PROFILE_UPDATE_PROFILE )
    //     .map<string>(toPayload)
    //     .switchMap(name => this.profileService.updateProfile(name)
    //         .map(name => ({ type: ProfileActions.PROFILE_UPDATE_PROFILE_SUCCESS, payload: name }))
    //         .catch(error => Observable.of({type: ProfileActions.PROFILE_UPDATE_PROFILE_FAIL, payload: error}))
    //     );
}