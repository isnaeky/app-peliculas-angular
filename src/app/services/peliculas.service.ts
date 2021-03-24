import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, of, pipe } from 'rxjs';
import { CarteleraResponse, Movie } from '../interfaces/cartelera-response';
import { tap, map, catchError } from 'rxjs/operators';
import { Params } from '@angular/router';
import { MovieDetails } from '../interfaces/movie-response';
import { MovieCast } from '../interfaces/movie-credits';

@Injectable({
  providedIn: 'root',
})
export class PeliculasService {
  private baseUrl: String = 'https://api.themoviedb.org/3';
  private cateleraPage = 1;
  public cargando: boolean = false;
  constructor(private http: HttpClient) {}

  carteleraPage() {
    this.cateleraPage = 1;
  }

  get params() {
    return {
      api_key: '18d6fcca63d1580525e1f9f31ad37581',
      language: 'es-Es',
      page: this.cateleraPage.toString(),
    };
  }

  getCartelera(): Observable<Movie[]> {
    if (this.cargando) {
      return of([]);
    }
    this.cargando = true;
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/movie/now_playing?`, {
        params: this.params,
      })
      .pipe(
        map((resp) => resp.results),
        tap(() => {
          this.cateleraPage += 1;
          this.cargando = false;
        })
      );
  }

  buscarPeli(txt: string): Observable<Movie[]> {
    //Descentralizar el obj de params para modificarlo y se agrega otro campo
    const params = { ...this.params, page: '1', query: txt };
    return this.http
      .get<CarteleraResponse>(`${this.baseUrl}/search/movie?`, {
        params,
      })
      .pipe(map((resp) => resp.results));
  }

  //Pelicula especifica con el id
  //https://api.themoviedb.org/3/movie/527774?api_key=18d6fcca63d1580525e1f9f31ad37581&language=es-ES
  buscarOnePelicula(id: string) {
    //pasa el obj this.params a una constante para eliminar una propiedad
    const params = { ...this.params};
    //Remueve la propiedad page de const params
    delete params.page;
    return this.http.get<MovieDetails>(`${this.baseUrl}/movie/${id}`,{
      params,
    }).pipe(
      catchError(er => of(null))
    );
  }


  buscarCastingOnePelicula(id:string){
    //pasa el obj this.params a una constante para eliminar una propiedad
    const params = { ...this.params};
    //Remueve la propiedad page de const params
    delete params.page;
    return this.http.get<MovieCast>(`${this.baseUrl}/movie/${id}/credits`,{
      params,
    }).pipe(
      //Se utiliza map para desentralizar solo una parte del objeto 
      map(resp=> resp.cast),
      catchError(er => of([]))
    )
  }
}
