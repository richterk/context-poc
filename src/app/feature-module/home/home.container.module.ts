import { HomeComponent } from './component/home/home.component';
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { HomeContainerComponent } from './containers/home.container.component';

@NgModule({
  imports: [
    CommonModule
  ],
  exports: [HomeContainerComponent, HomeComponent],
  declarations: [HomeContainerComponent, HomeComponent],
  bootstrap: [HomeContainerComponent]
})
export class HomeContainerModule { }
