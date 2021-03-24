import { Component, Input, OnInit, AfterViewInit } from '@angular/core';
import { Cast } from '../../interfaces/movie-credits';
import Swiper from 'swiper/core';

@Component({
  selector: 'app-cast-slider-show',
  templateUrl: './cast-slider-show.component.html',
  styleUrls: ['./cast-slider-show.component.css'],
})
export class CastSliderShowComponent implements OnInit, AfterViewInit {
  @Input() cast: Cast[];
 // swiper: Swiper;
  constructor() {}

  ngAfterViewInit(): void {
    /*const*/ const swiper = new Swiper('.swiper-container', {
      // Optional parameters
       slidesPerView: 5,
      spaceBetween: 15,
      freeMode:true
    });
  }

  ngOnInit(): void {
    console.log(this.cast);
  }
}
