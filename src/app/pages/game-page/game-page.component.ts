import { Component } from '@angular/core';
import {Game} from '../../types/types'
import {BackendRequestService} from "../../services/backend-request.service";
import {GameCardComponent} from "../../components/game-card/game-card.component";
import {NgForOf} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";

@Component({
  selector: 'pickem-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  imports: [
    GameCardComponent,
    NgForOf,
    MatGridListModule
  ],
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  constructor(private backendService: BackendRequestService) {
    this.backendService.getGamesByDate(2024, 3, 28).subscribe(data => {
      const unSchedGames = data.filter(g => g.startTimeUTC.toString().endsWith("33:00"))  // Somehow automatic TBD
      const schedGames = data.filter(g => !unSchedGames.includes(g))
      this.games = schedGames.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())
      this.games.push(...unSchedGames)
    })
  }

  games: Game[] = []

}
