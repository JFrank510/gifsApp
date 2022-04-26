import { HttpClient, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Gif, SearchGifsResponse } from '../interface/gifs.interface';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial : string[] = [];
  private apiKey     : string = 'X28JSEKvTKP90xuBwfspk9228DDmGup7';
  private servicioURL: string = 'http://api.giphy.com/v1/gifs';
  public resultados  : Gif[] =[];

  get historial(){

    return [...this._historial];
  }

  constructor(private http:HttpClient){

    this._historial = JSON.parse(localStorage.getItem('historial')!) || []
    this.resultados = JSON.parse(localStorage.getItem('resultados')!) || []
  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();
 
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
      localStorage.setItem('historial', JSON.stringify(this._historial));
    }
    
    const params = new HttpParams() 
    .set('apikey', this.apiKey)
    .set('limit', '10')
    .set('q',query);
    
    this.http.get<SearchGifsResponse>(`${this.servicioURL}/search`, {params})
    .subscribe((resp) => {
      console.log(resp.data);
      this.resultados = resp.data;
      localStorage.setItem('resultados',JSON.stringify(this.resultados))
    } )
  }

}
