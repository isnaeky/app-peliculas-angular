import { Component, OnInit, Input, AfterViewInit } from '@angular/core';
import { Movie } from '../../interfaces/cartelera-response';
import { Swiper } from 'swiper/core';

@Component({
  selector: 'app-slideshow',
  templateUrl: './slideshow.component.html',
  styleUrls: ['./slideshow.component.css'],
})
export class SlideshowComponent implements OnInit, AfterViewInit {
  @Input() movies: Movie[];
  swiper: Swiper;
  constructor() {}

  //Despues de que la vista se haya inicializado
  ngAfterViewInit() {
    /*const*/ this.swiper = new Swiper('.swiper-container', {
      // Optional parameters
      loop: true,
    });
  }

  onSliderNext() {
    this.swiper.slideNext();
  }
  onSliderPrev() {
    this.swiper.slidePrev();
  }

  ngOnInit(): void {
    //console.log(this.movies);
  }
}
