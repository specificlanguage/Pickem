import { Component } from '@angular/core';
import {Game} from '../../types/types'
import {BackendRequestService} from "../../services/backend-request.service";
import {GameCardComponent} from "../../components/game-card/game-card.component";
import {NgForOf} from "@angular/common";

@Component({
  selector: 'pickem-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  imports: [
    GameCardComponent,
    NgForOf
  ],
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  constructor(private backendService: BackendRequestService) {
    this.backendService.getGamesByDate(2024, 3, 28).subscribe(data => {
      console.log(data[0].startTimeUTC, typeof(data[0].startTimeUTC))
      this.games = data.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())
    })
  }

  games: Game[] = []

}
