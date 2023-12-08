import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
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

    // Pages
    HomepageComponent,

    // Material
    MatSlideToggleModule,
    MatTableModule,
    MatPaginatorModule,
    MatSortModule,
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
