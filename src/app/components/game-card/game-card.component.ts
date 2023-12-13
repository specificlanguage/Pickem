import {Component, Input} from '@angular/core';
import { CommonModule } from '@angular/common';
import {MatCardModule} from "@angular/material/card";
import {Game} from "../../types/types";

@Component({
  selector: 'pickem-game-card',
  standalone: true,
  imports: [CommonModule, MatCardModule],
  templateUrl: './game-card.component.html',
  styleUrls: ['./game-card.component.scss']
})
export class GameCardComponent {

  @Input() game: Game | null = null;

}
