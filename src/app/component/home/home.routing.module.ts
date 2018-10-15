import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeRoutingComponent } from './home.routing.component';
import { HomeContainerModule } from '../../feature-module/home/home.container.module';

@NgModule({
  imports: [
    CommonModule,
    HomeContainerModule
  ],
  declarations: [HomeRoutingComponent],
  bootstrap: [HomeRoutingComponent]
})
export class HomeRoutingModule { }
