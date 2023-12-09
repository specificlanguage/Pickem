import { Component } from '@angular/core';
import {MatTabsModule} from "@angular/material/tabs";
import {LoginFormComponent} from "../../components/login-form/login-form.component";

@Component({
  selector: 'pickem-login-page',
  standalone: true,
  templateUrl: './login-page.component.html',
  imports: [
    MatTabsModule,
    LoginFormComponent
  ],
  styleUrls: ['./login-page.component.scss']
})
export class LoginPageComponent {

}
