import { Component } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-resultados',
  templateUrl: './resultados.component.html',
  
})
export class ResultadosComponent  {

  constructor(private gifsService:GifsService){} //i8nyeccion de dependencias.

  get getResultados(){
    return this.gifsService.resultados;
  }

} 
