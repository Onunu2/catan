import { Injectable } from '@angular/core';
import {playersConst} from "./consts/players.const";
import {BehaviorSubject, Subject} from "rxjs";

@Injectable({
  providedIn: 'root'
})
export class PlayersService {

  private _playersConst=[];
  private playersSub: BehaviorSubject<any[]>;

  get playersConst() {
    return this.playersSub.asObservable();
  }
  constructor() {
    this._playersConst = playersConst;
    this.playersSub = new BehaviorSubject<any[]>(this._playersConst);
  }

  newPlayersConst(){
    this._playersConst = playersConst;
    this.playersSub.next(this._playersConst)
  }

  addPoint(color){
    this._playersConst.find(value => value.color === color).points++;
  }

  removePoint(color){
    this._playersConst.find(value => value.color === color).points--;
  }

  removeUser(color){
    const turn = this._playersConst.find(val=> val.color === color).turn;
    this._playersConst.forEach(val => val.turn > turn ? val.turn-- : undefined);
    this._playersConst = this._playersConst.filter(val=> val.color !== color);
    this.playersSub.next(this._playersConst)
  }

  setTurn(color: string, turn: number) {
    const old = this._playersConst.find(value => value.turn === turn);
    const newTu = this._playersConst.find(value => value.color === color);

    old.turn = newTu.turn;
    newTu.turn = turn;

    this._playersConst.sort((a, b) => a.turn - b.turn);
    this.playersSub.next(this._playersConst)
  }

  changeTurns(){
    const length = this._playersConst.length;
    this._playersConst.forEach(val => {
      return val.turn = (val.turn + length - 2) % length + 1;
    });
    this._playersConst.sort((a, b) => a.turn - b.turn);
    this.playersSub.next(this._playersConst)
  }
}
