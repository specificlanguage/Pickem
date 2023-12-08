import { Component } from '@angular/core';
import {MatToolbarModule} from "@angular/material/toolbar";
import {MatIconModule} from "@angular/material/icon";

@Component({
  selector: 'app-toolbar',
  standalone: true,
  templateUrl: './toolbar.component.html',
  imports: [
    MatToolbarModule,
    MatIconModule
  ],
  styleUrls: ['./toolbar.component.scss']
})
export class ToolbarComponent {

}
