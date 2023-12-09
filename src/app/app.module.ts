import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import {AppRoutingModule, routes} from './app-routing.module';
import { AppComponent } from './app.component';
import {initializeApp, provideFirebaseApp} from "@angular/fire/app";
import {provideAuth, getAuth} from "@angular/fire/auth";
import {environment} from "../environments/environment";
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import {MatSlideToggleModule} from "@angular/material/slide-toggle";
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { MatSortModule } from '@angular/material/sort';
import { ToolbarComponent } from './components/toolbar/toolbar.component';
import { HomepageComponent } from './pages/homepage/homepage.component';
import { LoginPageComponent } from './pages/login-page/login-page.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import {provideRouter, withComponentInputBinding} from "@angular/router";
import { ProfileMenuComponent } from './components/profile-menu/profile-menu.component';
import { FooterComponent } from './components/footer/footer.component';
import {MatToolbarModule} from "@angular/material/toolbar";


@NgModule({
  declarations: [
    AppComponent,
  ],
    imports: [
        // Universal stuff
        provideFirebaseApp(() => initializeApp(environment.firebase)),
        provideAuth(() => getAuth()),
        BrowserModule,
        AppRoutingModule,
        BrowserAnimationsModule,

        // Components
        ToolbarComponent,
        ProfileMenuComponent,
        FooterComponent,

        // Pages
        HomepageComponent,
        LoginPageComponent,

        // Material
        MatSlideToggleModule,
        MatTableModule,
        MatPaginatorModule,
        MatSortModule,

        // External
        FontAwesomeModule,
        MatToolbarModule,
    ],
  providers: [provideRouter(routes, withComponentInputBinding())],
  bootstrap: [AppComponent]
})
export class AppModule { }
