export interface Game {
  id: number,
  date: Date,
  venue: string,
  homeTeam_id: number,
  awayTeam_id: number,
  startTimeUTC: Date,
  finished: boolean,
  homeName: string,
  awayName: string,
}
