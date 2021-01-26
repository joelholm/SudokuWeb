import { Component, OnInit, Input } from '@angular/core';
import { Observable, Subscription } from 'rxjs';

import { Fireworks } from 'fireworks-js'

@Component({
  selector: 'app-fireworks',
  templateUrl: './fireworks.component.html',
  styleUrls: ['./fireworks.component.css']
})
export class FireworksComponent implements OnInit {
  private fireworks: Fireworks;

  private eventsSubscription: Subscription;
  @Input() fireworkEvent: Observable<boolean>;

  constructor() { }

  ngOnInit(): void {

    this.eventsSubscription = this.fireworkEvent.subscribe(turnOnFireworks => {
      if(turnOnFireworks){
        this.startFireworks();
      } else {
        this.stopFireworks();
      }
    });
  }

  startFireworks(): void {
    document.getElementById("overlay").style.display = "block";

    const container = document.querySelector('.fireworks-container');

    this.fireworks = new Fireworks({
        target: container,
        hue: 10,
        startDelay: 1,
        minDelay: 20,
        maxDelay: 30,
        speed: 4,
        acceleration: 1.05,
        friction: 0.98,
        gravity: 1,
        particles: 150,
        trace: 3,
        explosion: 5,
        boundaries: {
            top: 50,
            bottom: container.clientHeight,
            left: 50,
            right: container.clientWidth
        },
        sound: {
            enable: false,
            list: [
                'explosion0.mp3',
                'explosion1.mp3',
                'explosion2.mp3'
            ],
            min: 4,
            max: 8
        }
    });

    this.fireworks.start();
  }

  stopFireworks(): void { //TODO: This is never used, the game just kinda freezes after a win
    document.getElementById("overlay").style.display = "none";
    this.fireworks.start();
  }
}
