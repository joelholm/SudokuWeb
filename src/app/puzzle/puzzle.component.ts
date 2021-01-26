import { Component, OnInit, HostListener, Output, EventEmitter } from '@angular/core';
import { SudokuService } from '../sudoku.service';
import { Sudoku } from '../sudoku';

@Component({
  selector: 'app-puzzle',
  templateUrl: './puzzle.component.html',
  styleUrls: ['./puzzle.component.css']
})
export class PuzzleComponent implements OnInit {
  puzzle: Sudoku;
  private selectedBox: number = -1;
  private selectedSpace: number = -1;
  private attemptedNumber: number = 0;

  @Output() gameOverEvent: EventEmitter<boolean> = new EventEmitter<boolean>();

  constructor(private sudokuService: SudokuService) { }

  ngOnInit(): void {
    var difficulty = 3; //TODO: make a home screen to set the difficulty from the web browser
    this.sudokuService.createPuzzle(difficulty)
      .subscribe(puzzle => {
        this.puzzle = puzzle;
      });
  }

  selectSpace(i: number, j: number): void {
    if( this.selectedSpace == i && this.selectedBox == j ){
      return;
    }
    if( this.selectedSpace != -1 && this.selectedBox != -1 ){
      this.puzzle.puzzle[this.selectedBox][this.selectedSpace] = 0;
    }
    this.selectedBox = -1;
    this.selectedSpace = -1;
    this.attemptedNumber = 0;
    if( this.puzzle.puzzle[j][i] == 0 ){
      this.selectedBox = j;
      this.selectedSpace = i;
      this.attemptedNumber = 0;
    }
  }

  @HostListener('window:keydown', ['$event'])
  keyPress(event: KeyboardEvent): void {
    var attemptedNum: number = +event.key;
    if( attemptedNum >= 1 && attemptedNum <= 9 && this.selectedBox != -1 && this.selectedSpace != -1 ){
      this.attemptedNumber = attemptedNum;
      this.puzzle.puzzle[this.selectedBox][this.selectedSpace] = attemptedNum;
    }
    if( event.key == "Enter" && this.attemptedNumber != 0 ){
      this.sudokuService.attemptMove(this.attemptedNumber, this.selectedBox, this.selectedSpace)
        .subscribe(data => {
          console.log(data);
          if(data['isValidMove']){
            this.puzzle.puzzle[this.selectedBox][this.selectedSpace] = this.attemptedNumber;
            this.selectedBox = -1;
            this.selectedSpace = -1;
            this.attemptedNumber = 0;
            if(data['isGameOver']){
              this.gameOverEvent.emit(true);
            }
          } else {
            this.puzzle.puzzle[this.selectedBox][this.selectedSpace] = 0;
            this.selectedBox = -1;
            this.selectedSpace = -1;
            this.attemptedNumber = 0;
          }
        });
    }
  }
}
