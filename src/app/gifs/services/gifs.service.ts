import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class GifsService {
  private _historial: string[] = [];
  private apiKey: string = 'http://api.giphy.com/v1/gifs/search?api_key=X28JSEKvTKP90xuBwfspk9228DDmGup7&q=goku&limit=10'

  get historial(){

    return [...this._historial];
  }

  constructor(private http:HttpClient){

  }

  buscarGifs(query: string){

    query = query.trim().toLocaleLowerCase();
 
    if(!this._historial.includes(query)){
      this._historial.unshift(query);
      this._historial = this._historial.splice(0,10);
    }
    
    this.http.get('http://api.giphy.com/v1/gifs/search?api_key=X28JSEKvTKP90xuBwfspk9228DDmGup7&q=goku&limit=10')
    .subscribe((resp: any) => {
      console.log(resp.data);
      
    } )
  }

}
