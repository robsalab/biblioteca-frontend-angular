import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';

import { Dbbiblioteca } from '../model/dbbiblioteca';
import { delay, first, tap } from 'rxjs/operators'

@Injectable({
  providedIn: 'root'
})
export class BibliotecaService {

  private readonly API = 'api/biblioteca/todos';

  constructor(private httpClient: HttpClient) { }

  listAll() {
    return this.httpClient.get<Dbbiblioteca[]>(this.API)
    .pipe(
      delay(1000),
      first(),
      tap(dados => console.log(dados))
    );
  }

}
