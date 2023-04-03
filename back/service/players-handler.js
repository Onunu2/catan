const playersDefault = require("./players-array");
const { Server } = require('ws');

sockserver.clients.forEach((client) => {
  const data = JSON.stringify({'type': 'time', 'time': new Date().toTimeString()});
  client.send(data);
});
class PlayersHandler {

  _playersConst=[];
  sockserver;

  constructor() {
    this._playersConst = playersDefault;

    this.sockserver = new Server({ port: 443 });
    sockserver.on('connection', (ws) => {
      console.log('New client connected!');
      ws.on('close', () => console.log('Client has disconnected!'));
    });

  }

  newPlayersConst(){
    this._playersConst = playersDefault;
    this.updatePlayers()
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
    this.updatePlayers()
  }

  setTurn(color, turn) {
    const old = this._playersConst.find(value => value.turn === turn);
    const newTu = this._playersConst.find(value => value.color === color);

    old.turn = newTu.turn;
    newTu.turn = turn;

    this._playersConst.sort((a, b) => a.turn - b.turn);
    this.updatePlayers()
  }

  changeTurns(){
    const length = this._playersConst.length;
    this._playersConst.forEach(val => {
      return val.turn = (val.turn + length - 2) % length + 1;
    });
    this._playersConst.sort((a, b) => a.turn - b.turn);
    this.updatePlayers()
  }

  getPlayers(){
    return this._playersConst;
  }

  updatePlayers() {
    sockserver.clients.forEach((client) => {
      client.send(this.getPlayers());
    });
  }
}

module.exports = { PlayersHandler }

