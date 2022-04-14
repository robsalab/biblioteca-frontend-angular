import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog } from '@angular/material/dialog';
import { Observable, of } from 'rxjs';
import { catchError } from 'rxjs/operators';
import { ErrorDialogComponent } from 'src/app/shared/components/error-dialog/error-dialog.component';
import { Dbbiblioteca } from '../model/dbbiblioteca';
import { BibliotecaService } from '../services/biblioteca.service';

import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { MatPaginatorModule } from '@angular/material/paginator';
import { DialogComponent } from 'src/app/dialog/dialog.component';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-biblioteca',
  templateUrl: './biblioteca.component.html',
  styleUrls: ['./biblioteca.component.scss']
})
export class BibliotecaComponent implements OnInit {

  displayedColumns: string[]= [ 'stRegistroAtivo', '_id', 'name', 'ano', 'dtCadastro', 'category', 'action'];

  dataSource!: MatTableDataSource<any>;

  @ViewChild(MatPaginator) paginator!: MatPaginator;
  @ViewChild(MatSort) sort!: MatSort;

  constructor( private api: ApiService, public dialog: MatDialog ) {}

  onError(errorMsg: string) {
    this.dialog.open(ErrorDialogComponent, {
      data: errorMsg
    });
  }

  ngOnInit(): void {
    this.getDadosBiblioteca();
  }

  getDadosBiblioteca(){
    this.api.getDados()
    .subscribe({
      next:(res) => {
        console.log(res);
        this.dataSource = new MatTableDataSource(res);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      },
      error:(err) => {
        alert("erro ao carregar_FORM")
        this.getDadosBiblioteca();
      }      
    })
  }

  editDados(dado: any){
    this.dialog.open(DialogComponent, {
      width: '80%',
      data: dado
    }).afterClosed().subscribe(val => {
        this.getDadosBiblioteca();
    })
  }

  openDialog(){
    this.dialog.open(DialogComponent, {
      width: '80%'
    }).afterClosed().subscribe(val => {
        this.getDadosBiblioteca();
    })
  }

  deleteDados(dado: any){
    this.api.deleteDados(dado, dado._id)
    .subscribe({
      next:(res) => {
        // alert("Deletado com sucesso!")
        this.getDadosBiblioteca();
      },
      error:() => {
        // alert("erro ao deletar_FORM")
        this.getDadosBiblioteca();
      },
      complete: () => {
        // alert("Deletado com sucesso!")
        this.getDadosBiblioteca();
      }
    })
  }

  ativarDados(dado: any){
    this.api.ativarDados(dado, dado._id)
    .subscribe({
      next:(res) => {
        // alert("Ativado com sucesso!")
        this.getDadosBiblioteca();
      },
      error:() => {
        // alert("erro ao ativar_FORM")
        this.getDadosBiblioteca();
      },
      complete: () => {
        // alert("Ativado com sucesso!")
        this.getDadosBiblioteca();
      }
    })
  }

  applyFilter(event: Event) {
    const filterValue = (event.target as HTMLInputElement).value;
    this.dataSource.filter = filterValue.trim().toLowerCase();

    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }

}
function DialogDataExampleDialog(DialogDataExampleDialog: any, arg1: { data: { animal: string; }; }) {
  throw new Error('Function not implemented.');
}

