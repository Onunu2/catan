import {Component, Input, OnChanges, OnInit, SimpleChanges} from '@angular/core';
import {PlayersService} from "../players.service";

@Component({
  selector: 'app-player',
  templateUrl: './player.component.html',
  styleUrls: ['./player.component.scss']
})
export class PlayerComponent  {
  @Input() color: string;
  @Input() value: number;
  @Input() turn: number;

  constructor(private playersService :PlayersService) { }


  valueColor() {
    if(this.value >= 6 && this.value <=10)
      return '#FF8C00'; // dark orange
    if(this.value >= 11)
      return '#FF4500'; // orange red
    return '#FFFFFF';
  }

  minus() {
    this.value --;
    this.playersService.removePoint(this.color);
  }

  plus() {
    this.value++;
    this.playersService.addPoint(this.color);
  }

  removePlayer() {
    if(confirm('Are you sure you want to remove '+this.color+' player?')){
      this.playersService.removeUser(this.color);
    }
  }

  turnChange() {
    this.playersService.setTurn(this.color,this.turn);
  }
}
