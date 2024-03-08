import { Component, OnInit } from '@angular/core';
import { ImageHolderComponent } from './components/image-holder/image-holder.component';
import { SpecialComponent } from './components/special/special.component';
import { SpecialitiesComponent } from './components/specialities/specialities.component';
import { FormComponent } from './components/form/form.component';
import { DiningPlatesComponent } from './components/dining-plates/dining-plates.component';
import { HomeAboutUsComponent } from './components/home-about-us/home-about-us.component';
@Component({
  selector: 'app-home',
  standalone: true,
  imports: [
    ImageHolderComponent,
    SpecialComponent,
    SpecialitiesComponent,
    FormComponent,
    DiningPlatesComponent,
    HomeAboutUsComponent,
  ],
  providers: [],
  templateUrl: './home.component.html',
  styleUrl: './home.component.scss',
})
export class HomeComponent {}
