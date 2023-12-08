import { Component } from '@angular/core';
import {environment} from "../environments/environment";
import {MatSlideToggleModule} from "@angular/material/slide-toggle";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'pickem';
}
