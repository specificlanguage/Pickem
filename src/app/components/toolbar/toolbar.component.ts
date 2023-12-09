import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {ProfileMenuComponent} from "../profile-menu/profile-menu.component";

@Component({
  selector: 'pickem-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  imports: [
    MatToolbarModule,
    ProfileMenuComponent
  ],
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

}
