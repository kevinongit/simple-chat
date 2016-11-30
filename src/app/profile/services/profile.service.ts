import { Injectable } from '@angular/core';
import { Observable } from 'rxjs/Observable';

import { User } from '../models/user.model';

@Injectable()
export class ProfileService {
    currentUser: User = {
        _id: '0',
        name: 'Sparrow'
    };

    updateProfile(name: string): Observable<string> {
        this.currentUser.name = name;
        console.log("ProfileService, name = " + name);
        // fake API 
        return Observable.of(name);
    }
}