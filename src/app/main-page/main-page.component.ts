import { Component, OnInit } from '@angular/core';
import { Subject } from 'rxjs';

@Component({
  selector: 'app-main-page',
  templateUrl: './main-page.component.html',
  styleUrls: ['./main-page.component.css']
})
export class MainPageComponent implements OnInit {
  fireworkEvent: Subject<boolean> = new Subject<boolean>();

  constructor() { }

  ngOnInit(): void {

  }

  start(isGameOver: boolean): void {
    this.fireworkEvent.next(isGameOver);
  }

}
