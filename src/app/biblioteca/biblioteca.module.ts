import { CommonModule } from '@angular/common';
import { HttpClientModule } from '@angular/common/http';
import { NgModule } from '@angular/core';

import { AppMaterialModule } from '../shared/app-material/app-material.module';
import { SharedModule } from '../shared/shared.module';
import { BibliotecaRoutingModule } from './biblioteca-routing.module';
import { BibliotecaComponent } from './biblioteca/biblioteca.component';


@NgModule({
  declarations: [
    BibliotecaComponent
  ],
  imports: [
    CommonModule,
    BibliotecaRoutingModule,   
    AppMaterialModule,
    SharedModule,
    HttpClientModule    
  ]
})
export class BibliotecaModule { }
