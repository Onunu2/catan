import { Component } from '@angular/core';
import {PlayersService} from "./players.service";
import {Observable} from "rxjs";

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent {
  title = 'project';
  playersObs: Observable<any[]>;
  timerTime: number;
  private playersConst: any[];

   isRollDiceTime = false;

  constructor(private playersService:PlayersService) {
    this.playersObs = playersService.playersConst;
  }

  ngOnInit(){
    this.playersService.playersConst.subscribe(val => {
      this.playersConst = val;
      this.timerTime = 5;
      this.isRollDiceTime = true;
    })
  }

  changeTurns() {
    if(!this.isRollDiceTime) {
      this.playersService.changeTurns();
    } else {
      this.isRollDiceTime = false;
      if (this.playersConst[0].points < 6)
        this.timerTime = 8;
      else if (this.playersConst[0].points < 10)
        this.timerTime = 12
      else
        this.timerTime = 18
    }
  }

  newGame() {
    this.isRollDiceTime = false;
    this.playersService.newPlayersConst();
  }
}
