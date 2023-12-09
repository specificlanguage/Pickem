import {Component, inject} from '@angular/core';
import {ToolbarComponent} from "../../components/toolbar/toolbar.component";
import {Auth} from "@angular/fire/auth";
import {Subscription} from "rxjs";
import {AsyncPipe, NgIf} from "@angular/common";
import {RouterLink} from "@angular/router";

@Component({
  selector: 'app-homepage',
  standalone: true,
  imports: [ToolbarComponent, AsyncPipe, NgIf, RouterLink],
  templateUrl: './homepage.component.html',
  styleUrls: ['./homepage.component.scss']
})
export class HomepageComponent {
  protected auth: Auth = inject(Auth);


}
