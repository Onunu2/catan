import {Component, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output} from '@angular/core';
import {interval} from "rxjs";

@Component({
  selector: 'app-timer',
  templateUrl: './timer.component.html',
  styleUrls: ['./timer.component.scss']
})
export class TimerComponent implements OnChanges,OnInit,OnDestroy {
  @Input() timeToCountInSec: number;
  @Input() message: string;
  @Input() messageColor: string;
  @Output() finish: EventEmitter<any>;
  minutes: number;
  seconds: number;
  private secondLeft: number;
  private interval: any;
  private sub: any;
  pause: boolean = false;
  constructor() {
    this.finish = new EventEmitter();
  }


  ngOnInit(){
  }
  ngOnChanges() {
    if(this.sub)
      this.sub.unsubscribe();
    if(!this.interval)
      this.interval = interval( 1000);
    this.secondLeft = this.timeToCountInSec;
    this.sub = this.interval.subscribe(() => {
      if(!this.pause) {
        this.secondLeft--;
        this.minutes = Math.floor(this.secondLeft / 60);
        this.seconds = this.secondLeft % 60;
        if (this.secondLeft === 0)
          this.timeFinish();
      }
    });
  }
  ngOnDestroy(){
    this.sub.unsubscribe();
  }

  timeFinish() {
    //play song
    this.pause = false;
    this.finish.emit();
  }

  timePause() {
    this.pause = !this.pause;
  }
}
