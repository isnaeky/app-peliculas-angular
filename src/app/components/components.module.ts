import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { NavbarComponent } from './navbar/navbar.component';
import { RouterModule } from '@angular/router';
import { SlideshowComponent } from './slideshow/slideshow.component';
import { PeliculasPosterGridComponent } from './peliculas-poster-grid/peliculas-poster-grid.component';
import { RatingModule } from 'ng-starrating';
/* import { SwiperModule } from 'swiper/angular'; */
import { PipesModule } from '../pipes/pipes.module';
import { CastSliderShowComponent } from './cast-slider-show/cast-slider-show.component';

@NgModule({
  declarations: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    PeliculasPosterGridComponent,
    CastSliderShowComponent,
  ],
  exports: [
    NavbarComponent,
    SlideshowComponent,
    PeliculasPosterGridComponent,
    RatingModule,
    CastSliderShowComponent
  ],
  imports: [CommonModule, RouterModule, RatingModule, PipesModule],
})
export class ComponentsModule {}
