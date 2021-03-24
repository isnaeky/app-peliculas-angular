import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Params } from '@angular/router';
import { PeliculasService } from '../../services/peliculas.service';
import { Movie } from '../../interfaces/cartelera-response';

@Component({
  selector: 'app-buscar',
  templateUrl: './buscar.component.html',
  styleUrls: ['./buscar.component.css'],
})
export class BuscarComponent implements OnInit {
  public movies: Movie[] = [];
  public txt: string;
  constructor(
    private activatedRoute: ActivatedRoute,
    private serv: PeliculasService
  ) {}

  ngOnInit(): void {
    this.activatedRoute.params.subscribe((p) => {
      this.buscar(p.id);
      this.txt = p.id;
    });
  }

  buscar(id: string) {
    this.movies = [];
    this.serv.buscarPeli(id).subscribe((movies) => {
      this.movies.push(...movies);
      console.log(movies);
    });
  }
}
