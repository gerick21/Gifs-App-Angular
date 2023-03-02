import { Component } from '@angular/core';
import { GifsService } from '../../gifs/services/gifs.service';

@Component({
  selector: 'app-sidebar',
  templateUrl: './sidebar.component.html',
 
})
export class SidebarComponent {

  constructor(private gifsService:GifsService){}


  get getHistorial(){
    return this.gifsService.getHistorial;

  }
  buscar(terminoBusqueda:string){ //para recuperar imagenes de cada uno de las busquedas recientes
    return this.gifsService.buscarGifs(terminoBusqueda);
  }

}
