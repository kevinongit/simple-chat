import { BrowserModule } from '@angular/platform-browser'
import { NgModule } from '@angular/core'
import { FormsModule, ReactiveFormsModule } from '@angular/forms'
import { HttpModule } from '@angular/http'
import { RouterModule } from '@angular/router'
import { StoreModule } from '@ngrx/store'
import { StoreDevtoolsModule } from '@ngrx/store-devtools'
import { EffectsModule } from '@ngrx/effects'

import { AppComponent } from './app.component'
import { ChatComponent } from './chat/components/chat.component'
import { ChannelHeaderComponent } from './chat/components/channel-header.component'
import { ChannelListComponent } from './chat/components/channel-list.component'
import { ChannelAddComponent } from './chat/components/channel-add.component'
import { ChatAreaHeaderComponent } from './chat/components/chat-area-header.component'
import { ChatAreaDialogComponent } from './chat/components/chat-area-dialog.component'
import { ChatAreaBottomComponent } from './chat/components/chat-area-bottom.component'
import { ProfileComponent } from './profile/components/profile.component'
import { InfoComponent } from './profile/components/info.component'
import { profileReducer } from './profile/reducers/profile.reducer'
import { ProfileEffects } from './profile/effects/profile.effects'
import { chatReducer } from './chat/reducers/chat.reducer'
import { ChatEffects } from './chat/effects/chat.effects'

import { routes } from './shared/routes/app.routes'

import { CalendarPipe } from './shared/pipes/calendar.pipe'

import { ChatService } from './chat/services/chat.service'
import { ProfileService } from './profile/services/profile.service'

@NgModule({
  declarations: [
    AppComponent,
    ChatComponent,
    CalendarPipe,
    ChannelHeaderComponent,
    ChannelListComponent,
    ChannelAddComponent,
    ChatAreaHeaderComponent,
    ChatAreaDialogComponent,
    ChatAreaBottomComponent,
    InfoComponent,
    ProfileComponent
  ],
  imports: [
    BrowserModule,
    FormsModule,
    ReactiveFormsModule,
    HttpModule,
    RouterModule.forRoot(routes),
    StoreModule.provideStore({
      profile: profileReducer,
      chat: chatReducer
    }),
    StoreDevtoolsModule.instrumentOnlyWithExtension(),
    EffectsModule.run(ProfileEffects),
    EffectsModule.run(ChatEffects)
  ],
  providers: [
    ChatService,
    ProfileService
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
