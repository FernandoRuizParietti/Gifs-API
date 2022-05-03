import { Component, ElementRef, ViewChild } from '@angular/core';
import { GifsService } from '../services/gifs.service';

@Component({
  selector: 'app-busqueda',
  templateUrl: './busqueda.component.html',
  styles: [
  ]
})
export class BusquedaComponent{

  @ViewChild('txtBuscar') txtBuscar!: ElementRef<HTMLInputElement>; 
  //el negado delante de los : es para evitar el error cuando el objeto txtBuscar es null

  //Inyecto el servicio
  constructor(private gifsService: GifsService ){
  }
  buscar(){
    const valor = this.txtBuscar.nativeElement.value

    //evito que se almacenen busquedas vacias en mi arreglo
    if(valor.trim().length === 0){
      return
    }
    this.gifsService.buscarGifs(valor)
    this.txtBuscar.nativeElement.value= '' //con esto borro la barra de busqueda despues del enter
  }
}
