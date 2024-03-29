import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { ContactusComponent } from '../components/contactus/contactus.component';
import { MenuComponent } from '../components/menu/menu.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { NavbarComponent } from '../components/navbar/navbar.component';
import { FooterComponent } from '../components/footer/footer.component';
import { HttpClientModule } from '@angular/common/http';
import { CartComponent } from '../components/cart/cart.component';
import { AuthService } from '../services/auth.service';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    RouterOutlet,
    HttpClientModule,
    NavbarComponent,
    FooterComponent,
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
  providers: [AuthService],
  templateUrl: './app.component.html',
  styleUrl: './app.component.scss',
})
export class AppComponent {
  title = 'Gusteau-Resturant';
}
