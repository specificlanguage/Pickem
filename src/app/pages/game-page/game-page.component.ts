import {Component} from '@angular/core';
import {Game} from '../../types/types'
import {BackendRequestService} from "../../services/backend-request.service";
import {GameCardComponent} from "../../components/game-card/game-card.component";
import {DatePipe, KeyValuePipe, NgForOf, NgIf} from "@angular/common";
import {MatGridListModule} from "@angular/material/grid-list";
import {MatButtonToggleModule} from "@angular/material/button-toggle";
import {MatDividerModule} from "@angular/material/divider";
import {groupSeriesGames} from "../../shared/gameParsingUtils";
import {SeriesCardComponent} from "../../components/series-card/series-card.component";

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
    MatDividerModule,
    SeriesCardComponent,
    KeyValuePipe
  ],
  styleUrls: ['./game-page.component.scss']
})
export class GamePageComponent {

  constructor(private backendService: BackendRequestService) {}
  viewByDay: boolean = true;
  seriesGames: Map<string, Game[]> | null = null;
  dayGames: Game[] = []
  viewBySeriesDisplayDate: string = "";
  viewByDayDisplayDate: string = "";

  public onViewChange(val: boolean) {
    this.viewByDay = val;
    if(this.viewByDay && this.dayGames == null) {
      this.refreshGamesByDate()
    } else if(!this.viewByDay && this.seriesGames == null) {
      this.refreshGamesBySeries()
    }
  }

  ngOnInit() {
    this.viewByDay = true; // May want user preferences later and save it
    this.refreshGamesByDate()
  }

  refreshGamesBySeries() {
    const datePipe: DatePipe = new DatePipe("en-US")
    this.backendService.getGamesBySeries(27).subscribe(data => {
      // Sort games by date
      const seriesGames = data.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())

      // Update display
      this.viewBySeriesDisplayDate = `${datePipe.transform(seriesGames.at(0)?.date, "MMM dd")}
       - ${datePipe.transform(seriesGames.at(-1)?.date, "MMM dd")}`

      // Group series into a map
      this.seriesGames = groupSeriesGames(seriesGames);
    })
  }

  refreshGamesByDate(){
    const datePipe: DatePipe = new DatePipe("en-US")
    this.backendService.getGamesByDate(2024, 3, 28).subscribe(data => {

      // Separate unscheduled games (anything TBD)
      const unSchedGames = data.filter(g => g.startTimeUTC.toString().endsWith("33:00"))  // Somehow automatic TBD
      const schedGames = data.filter(g => !unSchedGames.includes(g))

      // Sort the scheduled games, add TBD at end
      this.dayGames = schedGames.sort((g1, g2) => new Date(g1.startTimeUTC).getTime() - new Date(g2.startTimeUTC).getTime())
      this.dayGames.push(...unSchedGames)

      // Update display
      this.viewByDayDisplayDate = `${datePipe.transform(this.dayGames.at(0)?.date, "MMM dd")}`
    })
  }

}
