import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeComponent } from './home/home.component';
import { PeliculaComponent } from './pelicula/pelicula.component';
import { BuscarComponent } from './buscar/buscar.component';
import { SlideshowComponent } from '../components/slideshow/slideshow.component';
import { ComponentsModule } from '../components/components.module';
import { PipesModule } from '../pipes/pipes.module';




@NgModule({
  declarations: [HomeComponent, PeliculaComponent, BuscarComponent],
  imports: [
    CommonModule,
    ComponentsModule,
    PipesModule
  ],
  exports:[
    
  ]
})
export class PagesModule { }
