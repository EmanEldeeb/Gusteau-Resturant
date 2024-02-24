import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { CartComponent } from '../components/cart/cart.component';
import { ContactusComponent } from '../components/contactus/contactus.component';
import { MenuComponent } from '../components/menu/menu.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    LoginComponent,
    RegisterComponent,
    HomeComponent,
    AboutUsComponent,
    CategoriesComponent,
    ProductListComponent,
    ProductDetailsComponent,
    CartComponent,
    ContactusComponent,
    MenuComponent,
    NotfoundComponent,
  ],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Gusteau-Resturant';
}
