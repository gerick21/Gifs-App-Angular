import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';
import { SearchGifsResponse, Gif } from '../interface/gifs.interface';

/* Recordar que los servicios se ejecutan una sola vez (singleton), aunque sean llamados en 20 lugares diferentes.
Se ejecutan en el constructor. */

@Injectable({
  providedIn: 'root'
})

export class GifsService {

  private apiKey : string = 'CPoIQSUT5slnd8Ie5lNN0HXkPQiQYsJf';
  private servicioUrl : string  = 'https://api.giphy.com/v1/gifs'

  private _historial:string[]=[];
  
  public resultados:Gif[]=[];


  get getHistorial(){
    return [...this._historial]; //para romper la relacion se ponen los ...y las []
  }

  constructor(private http:HttpClient){ //inyeccion de dependencias.

    if(localStorage.getItem('historial')){ //persistencia de informacion

      this._historial=JSON.parse(localStorage.getItem('historial')!); //recuperar texto busqueda
      this.resultados=JSON.parse(localStorage.getItem('resultados')!); //recuperar imagenes de  busqueda
      //con el ! le digo a ts que confie en mi.
    }
    /* con este if lo que decimos es que si el historial de busqueda existe, que por favor lo recupere.
      y como la info esta en un objeto el JSON.parse lo pasa de JSON a un objeto de js. */


  } 

  buscarGifs(textoBusqueda:string){

    textoBusqueda=textoBusqueda.trim().toLowerCase(); //para no tener strings repetidos, solo que uno en mayus y otro en minus.
    

    if(!this._historial.includes(textoBusqueda)){//si el texto a buscar no ha sido buscado antes, lo agrego a bsuquedas recientes, porque para que voy a querer tener el mismo texto buscado recientemente 2 veces.
      this._historial.unshift(textoBusqueda);//pone el ultimo de primero.
      this._historial=this._historial.splice(0,10);//para que seolo se puedan poner 10 busquedas recientes.

      localStorage.setItem('historial',JSON.stringify(this._historial));//persistencia de informacion
     

      /* con la instruccion anterior, lo que basicamente hacemos es guardar nuestro historial de bsuqedas, para que 
      al refrescar el nacvegador no se pierdan nuestras busquedas, el JSON.stringify pasa de objeto de js a JSON, 
      le pone de key (nombre) del registro historial, para que asi luego en el constructor de este archivo, 
      busiquemos por key y recuperar el historial de busqueda.
      */

  }

  const params=new HttpParams() //este es una clase propia de angular y es para hacer que el htttp.get se vea mas limpio el
                                //link que le pasamos.
        .set('api_key',this.apiKey)
        .set('limit','10')
        .set('q',textoBusqueda);

    this.http.get<SearchGifsResponse>(`${this.servicioUrl}/search`,{params}) //ese link se ve mas limpio gracias al HttpParams.
          .subscribe((response:SearchGifsResponse)=>{ //es como un then de promesas.
            this.resultados=response.data;
            localStorage.setItem('resultados',JSON.stringify(this.resultados));
          })

    /* lo del SearchGifsResponse es una clase que creamos en interface, basicamente con una pagina que se llama 
    quicktype.io agarre el codigo que me tiro postman y el lo genera en codigo de ts y asi poder poder adecuar
    elcodigo a la pagina de giphy  */


    
    

   

  }




}
