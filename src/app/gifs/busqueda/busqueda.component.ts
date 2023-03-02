import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  
})
export class BusquedaComponent {

  @ViewChild('txtBuscar') txtBuscar!:ElementRef<HTMLInputElement>; //el ! es para que ts confie en mi y me deje poner el ElementRef,porque yo se que siempre va a er ese tipo de dato
  
  constructor(private gifsService:GifsService){} //inyeccion de dependencias.
  
  buscar(){

    const valor=this.txtBuscar.nativeElement.value;
    if(valor.trim().length===0){
      return;
    }
    else{
    this.gifsService.buscarGifs(valor);
    this.txtBuscar.nativeElement.value=' ';
    }
 

    
    
  }

}
