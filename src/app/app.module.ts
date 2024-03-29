import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { NgbModule, NgbModalModule } from '@ng-bootstrap/ng-bootstrap';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomepageComponent } from './homepage/homepage.component';
import { MovieComponent } from './modals/movie/movie.component';
import { TvshowComponent } from './modals/tvshow/tvshow.component';
import { PersonComponent } from './modals/person/person.component';
import { LoginComponentComponent } from './login-component/login-component.component';
import { RegisterComponent } from './register/register.component';
import { FavorisComponent } from './favoris/favoris.component';

@NgModule({
  declarations: [
    AppComponent,
    HomepageComponent,
    MovieComponent,
    TvshowComponent,
    PersonComponent,
    LoginComponentComponent,
    RegisterComponent,
    FavorisComponent
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    NgbModule,
    NgbModalModule
  ],
  entryComponents: [
    MovieComponent,
    TvshowComponent,
    PersonComponent
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
