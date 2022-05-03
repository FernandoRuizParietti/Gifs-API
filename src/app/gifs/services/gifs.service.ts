import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { SearchGifsResponse, Gif } from '../interfaces/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {

 private apiKey: string = 'dW7VHOMsJIUi5qPGmlRso1NI8ANbZGl4'
 private baseUrl: string= 'https://api.giphy.com/v1/gifs'
 private _historial: string[]= []

 public resultados: Gif[] = []
 
  get historial(){
   return [...this._historial]
 }

 constructor(private http: HttpClient){
   
   this._historial = JSON.parse(localStorage.getItem('historial')!)|| [];
   this.resultados = JSON.parse(localStorage.getItem('resultados')!)|| [];
 }
 
 buscarGifs(query:string =''){

  query = query.trim().toLocaleLowerCase(); 

  //este if es para evitar que se almacenen busquedas repetidas en el historial 
   if(!this._historial.includes(query)){
    this._historial.unshift(query)
    this._historial = this._historial.splice(0,10) //Corto el historial para que solo se muestren las ultimas 10 busquedas
  
    localStorage.setItem('historial', JSON.stringify(this._historial))
  }
     /*  fetch('https://api.giphy.com/v1/gifs/search?api_key=dW7VHOMsJIUi5qPGmlRso1NI8ANbZGl4&q=simpsons&limit=10')
      .then(res => {
        res.json().then(data => {
          console.log(data);
          })
      }) */

      const params = new HttpParams()
        .set('api_key', this.apiKey)
        .set('limit', '15')
        .set('q', query );

      //esto es una request http propia de angular (no es una request pura)
      this.http.get<SearchGifsResponse>(`${this.baseUrl}/search`,{params})
      .subscribe((res) =>{
        this.resultados = res.data;
        localStorage.setItem('resultados', JSON.stringify(this.resultados))
      })
 }
}
//Nota: SearchGifsResponse es una interface creada por mi y que especifica el tipo
//de dato que es la variable data que retorna la API de Giphy.com
//Esta interface fue creada de manera automatica en https://app.quicktype.io/, usando la respuesta 
//de postamn a la consulta get al endpoint: 
//https://api.giphy.com/v1/gifs/search?api_key=dW7VHOMsJIUi5qPGmlRso1NI8ANbZGl4&q=simpsons&limit=10