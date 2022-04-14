import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { map } from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ApiService {

  constructor(private Http : HttpClient) { }

  postDados( data : any) {
    return this.Http.post<any>("http://localhost:8080/api/biblioteca/",data).pipe(
      map(
        (res => {
          return res;
        })
      )
    )
  }

  getDados() {
    return this.Http.get<any>("http://localhost:8080/api/biblioteca/todos")
  }

  putDados( data : any, id : number) {
    // console.log(id);
    // console.log(data);
    return this.Http.put<any>("http://localhost:8080/api/biblioteca/"+id, data).pipe(
      map(
        (res => {
          return res;
        })
      )
    )
  }

  deleteDados(data : any, id : number) {
    return this.Http.put<any>("http://localhost:8080/api/biblioteca/delete/"+id, data).pipe(
      map(
        (res => {
          return res;
        })
      )
    )
  }

  ativarDados(data : any, id : number) {
    return this.Http.put<any>("http://localhost:8080/api/biblioteca/ativar/"+id, data).pipe(
      map(
        (res => {
          return res;
        })
      )
    )
  }

}
