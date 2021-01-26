import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';
import { catchError, tap } from 'rxjs/operators';
import { HttpClient, HttpHeaders } from '@angular/common/http';

import { Sudoku } from './sudoku';

@Injectable({
  providedIn: 'root'
})
export class SudokuService {
  private backendUrl = 'http://127.0.0.1:8000';

  constructor(private http: HttpClient) { }

  getPuzzle(): Observable<Sudoku> {
    return this.http.get<Sudoku>(`${this.backendUrl}/sudoku/`).pipe(
      tap(_ => console.log("getting sudoku puzzle from backend")),
      catchError(this.handleError<Sudoku>('getPuzzle', null))
    );
  }

  createPuzzle(difficulty: number): Observable<Sudoku> {
    var body = {
      "difficulty": difficulty
    };
    return this.http.post<Sudoku>(`${this.backendUrl}/sudoku/`, body).pipe(
      tap(_ => console.log("creating sudoku puzzle from backend")),
      catchError(this.handleError<Sudoku>('createPuzzle', null))
    )
  }

  attemptMove(num: number, boxNum: number, space: number): Observable<any> {
    var body = {
      "num": num,
      "boxNum": boxNum,
      "space": space
    };
    return this.http.post<boolean>(`${this.backendUrl}/sudoku/move/`, body).pipe(
      tap(_ => console.log("sending an attempted move to the backend")),
      catchError(this.handleError<boolean>('attemptMove', null))
    )
  }

  private handleError<T>(operation = 'operation', result?: T) {
   return (error: any): Observable<T> => {
     console.error(error);

     console.log(`${operation} failed: ${error.message}`);

     return of(result as T);
   }
 }

}
