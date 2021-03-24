import { Component, HostListener, OnDestroy, OnInit } from '@angular/core';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent implements OnInit,OnDestroy {
  public movies: Movie[] = [];
  public moviesSliderShow:Movie[]=[];
  @HostListener('window:scroll', ['$event'])
  onScroll() {
    //console.log('hola');
    const pos= (document.documentElement.scrollTop || document.body.scrollTop) + 1300;
    const max= (document.documentElement.scrollHeight || document.body.scrollHeight);
    
    if (pos>max) {
      if (this.services.cargando) {
        return;
      }
      console.log('Supero el limite');
      this.services.getCartelera().subscribe(movies=>{
        this.movies.push(...movies);

      })
    }
  }

  constructor(private services: PeliculasService) {}

  ngOnDestroy() {
    this.services.carteleraPage();
  }

  ngOnInit(): void {
    console.log('Cartelera');
    //Se tiene que mandar el subscribe si no, no ejecuta la peticion
    this.services.getCartelera().subscribe((movies) => {
      console.log(movies);
      this.movies =movies
      this.moviesSliderShow= movies;
    });
  }
}
