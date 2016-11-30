import { Routes } from '@angular/router';

import { ChatComponent } from '../../chat/components/chat.component';
import { ProfileComponent } from '../../profile/components/profile.component';

export const routes:Routes = [
    {
        path: 'channel/:name',
        component: ChatComponent
    },
    {
        path: 'profile',
        component: ProfileComponent
    },
    {
        path: '**',
        redirectTo: '/channel/general'
    }
];