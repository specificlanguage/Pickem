import {Component} from '@angular/core';
import {Game} from '../../types/types'
import {BackendRequestService} from "../../services/backend-request.service";
import {GameCardComponent} from "../../components/game-card/game-card.component";
import {NgForOf, NgIf} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDividerModule} from "@angular/material/divider";

@Component({
  selector: 'pickem-game-page',
  standalone: true,
  templateUrl: './game-page.component.html',
  imports: [
    GameCardComponent,
    NgForOf,
    MatGridListModule,
    MatButtonToggleModule,
    NgIf,
    MatDividerModule
  ],
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  constructor(private backendService: BackendRequestService) {}

  viewByDay: boolean = true;
  seriesGames: Game[] = []
  dayGames: Game[] = []
  displayDate: string = "";

  public onViewChange(val: boolean) {
    this.viewByDay = val;
    if(this.viewByDay){
      if(this.seriesGames.length == 0) {
        this.refreshGamesBySeries()
      } else {
        this.displayDate = `${this.seriesGames.at(0)?.date.toString()} - ${this.seriesGames.at(-1)?.date.toString()}`
      }
    } else {
      if(this.dayGames.length == 0) {
        this.refreshGamesByDate()
      } else {
        this.displayDate = `${this.dayGames.at(0)?.date.toString()}`
      }
    }
  }

  ngOnInit() {
    this.viewByDay = true; // May want user preferences later and save it
  }

  refreshGamesBySeries() {
    this.backendService.getGamesBySeries(27).subscribe(data => {
      const unSchedGames = data.filter(g => g.startTimeUTC.toString().endsWith("33:00"))  // Somehow automatic TBD
      const schedGames = data.filter(g => !unSchedGames.includes(g))
      this.seriesGames = schedGames.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())
      this.seriesGames.push(...unSchedGames)
      this.displayDate = `${this.seriesGames.at(0)?.date.toString()} - ${this.seriesGames.at(-1)?.date.toString()}`
    })
  }

  refreshGamesByDate(){
    this.backendService.getGamesByDate(2024, 3, 28).subscribe(data => {
      const unSchedGames = data.filter(g => g.startTimeUTC.toString().endsWith("33:00"))  // Somehow automatic TBD
      const schedGames = data.filter(g => !unSchedGames.includes(g))
      this.dayGames = schedGames.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())
      this.dayGames.push(...unSchedGames)
      this.displayDate = `${this.seriesGames.at(0)?.date.toString()} - ${this.seriesGames.at(-1)?.date.toString()}`
    })
  }

}
