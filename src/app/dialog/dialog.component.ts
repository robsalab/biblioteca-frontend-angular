import { Component, OnInit, Inject } from '@angular/core';
import { FormGroup, FormBuilder, Validators } from '@angular/forms';
import { ApiService } from '../services/api.service';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material/dialog';
import { inject } from '@angular/core/testing';

@Component({
  selector: 'app-dialog',
  templateUrl: './dialog.component.html',
  styleUrls: ['./dialog.component.scss']
})
export class DialogComponent implements OnInit {

  listTipoDocumento = [
    {name: 'Folder', value: 15},
    {name: 'Documentos', value: 2},
    {name: 'Livros', value: 3}
  ];
  
  listCategory = [
    {name: 'Políticas', value: 33},
    {name: 'Livros', value: 34},
    {name: 'Cartilhas, Guias e Manuais', value: 35},
    {name: 'Revistas', value: 36},
    {name: 'Relatórios', value: 37},
    {name: 'Documentos', value: 38},
    {name: 'Folder', value: 39}
  ]; 

  dadosForm !: FormGroup;
  actionBtn: string = "Salvar";
  dataSource: any = [];
  constructor(
    private formBuilder : FormBuilder, 
    private api : ApiService, 
    @Inject(MAT_DIALOG_DATA) public editDado : any,
    private dialogRef : MatDialogRef<DialogComponent>) { }

  ngOnInit(): void {
    console.log(this.editDado);
    this.dadosForm = this.formBuilder.group({
      name : ['',Validators.required],
      biblioteca : ['',Validators.required],
      autor : ['',Validators.required],
      ano : ['',Validators.required],
      editora : [''],
      palavraChave : [''],
      category : ['',Validators.required],
      urlDoc : ['',Validators.required],
      urlBvs : [''],
      urlImagem : ['',Validators.required],
      referencia : [''],
      resumo : [''],
      dtCadastro : [''],
      stRegistroAtivo : ['S']
    });
    if (this.editDado) {
      this.actionBtn = "Editar"
      this.dadosForm.controls['name'].setValue(this.editDado.name);
      this.dadosForm.controls['biblioteca'].setValue(this.editDado.biblioteca);
      this.dadosForm.controls['autor'].setValue(this.editDado.autor);
      this.dadosForm.controls['ano'].setValue(this.editDado.ano);
      this.dadosForm.controls['editora'].setValue(this.editDado.editora);
      this.dadosForm.controls['palavraChave'].setValue(this.editDado.palavraChave);
      this.dadosForm.controls['category'].setValue(this.editDado.category);
      this.dadosForm.controls['urlDoc'].setValue(this.editDado.urlDoc);
      this.dadosForm.controls['urlBvs'].setValue(this.editDado.urlBvs);
      this.dadosForm.controls['urlImagem'].setValue(this.editDado.urlImagem);
      this.dadosForm.controls['referencia'].setValue(this.editDado.referencia);
      this.dadosForm.controls['resumo'].setValue(this.editDado.resumo);
      this.dadosForm.controls['dtCadastro'].setValue(this.editDado.dtCadastro);
      console.log(this.dadosForm);
    }
  }

  saveDados(){
    if (!this.editDado) {
      if (this.dadosForm.valid) {
        this.api.postDados(this.dadosForm.value)
        .subscribe({
          next:(res) => {
            console.log(res);
            alert("Cadastro realizado com sucesso!") //ERRO NÃO PASSA AQUI
            this.dadosForm.reset();
            this.dialogRef.close('save');
          },
          error:(e) => {
            console.log(e);
            alert("Erro ao gravar os dados_DIALOG.")
            this.dadosForm.reset();
            this.dialogRef.close('save');
          },
          complete: () => {
            console.log('Registrado com sucesso')
            // alert("Registrado com sucesso.")
            this.dadosForm.reset();
            this.dialogRef.close('save');
          }
        })
      } 
    } else {
      this.updateDados()
    }
  }

  getBiblioteca(){
    this.api.getDados().subscribe(res => {
      // console.log(res)
      this.dataSource = res;
    })
  }

  updateDados(){    
    this.api.putDados(this.dadosForm.value,this.editDado._id)
    .subscribe({
      next:(res) => {
        // console.log(res);
        alert("Alteração realizada com sucesso!") //ERRO NÃO PASSA AQUI
        this.dadosForm.reset();
        this.dialogRef.close('update');
      },
      error:(e) => {
        // console.log(e);
        console.log(e);
        this.dadosForm.reset();
        this.dialogRef.close('update');
      },
      complete: () => {
        console.log('Atualizado com sucesso')
        // alert("Registrado com sucesso.")
        this.dadosForm.reset();
        this.dialogRef.close('update');
      }
    })      
  }

}
