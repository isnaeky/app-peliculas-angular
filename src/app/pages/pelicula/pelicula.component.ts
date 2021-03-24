import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { MovieDetails } from '../../interfaces/movie-response';
import { Location } from '@angular/common';
import { Cast } from '../../interfaces/movie-credits';
import { combineLatest } from 'rxjs';

@Component({
  selector: 'app-pelicula',
  templateUrl: './pelicula.component.html',
  styleUrls: ['./pelicula.component.css'],
})
export class PeliculaComponent implements OnInit {
  public pelicula: MovieDetails;
  public casting: Cast[] = [];
  constructor(
    private activated: ActivatedRoute,
    private ser: PeliculasService,
    private location: Location,
    private router: Router
  ) {}

  ngOnInit(): void {
    //Se utiliza {id,texto,bas} para la desectructueracion de los argumentos en dado caso que tengamos mas argumentos
    const { id } = this.activated.snapshot.params;

    combineLatest([
      this.ser.buscarOnePelicula(id),
      this.ser.buscarCastingOnePelicula(id),
    ]).subscribe(([pelicula, cast]) => {
      if (!pelicula) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = pelicula;
      this.casting = cast;
    });
//El combinelatest es para que los dos servicios esten respondiendo al mismo tiempo o que tarde uno pero esperan los dos 
    //  this.buscarPel(id);
    //  this.buscarCast(id);
  }

  buscarPel(id: string) {
    this.ser.buscarOnePelicula(id).subscribe((resp) => {
      if (!resp) {
        this.router.navigateByUrl('/home');
        return;
      }
      this.pelicula = resp;
      console.log('Pelicula: ');
      console.log(resp);
    });
  }
  onRegresar() {
    this.location.back();
  }

  buscarCast(id: string) {
    this.ser.buscarCastingOnePelicula(id).subscribe((resp) => {
      this.casting = resp;
      console.log('Casting: ');
      console.log(resp);
    });
  }
}
