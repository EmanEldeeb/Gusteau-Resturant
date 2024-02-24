import { Routes } from '@angular/router';
import { HomeComponent } from '../components/home/home.component';
import { MenuComponent } from '../components/menu/menu.component';
import { AboutUsComponent } from '../components/about-us/about-us.component';
import { CategoriesComponent } from '../components/categories/categories.component';
import { ContactusComponent } from '../components/contactus/contactus.component';
import { LoginComponent } from '../components/login/login.component';
import { RegisterComponent } from '../components/register/register.component';
import { ProductListComponent } from '../components/product-list/product-list.component';
import { ProductDetailsComponent } from '../components/product-details/product-details.component';
import { NotfoundComponent } from '../components/notfound/notfound.component';
import { CartComponent } from '../components/cart/cart.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent, title: 'Login' },
  { path: 'register', component: RegisterComponent, title: 'Register' },
  { path: '', redirectTo: 'home', pathMatch: 'full' },
  { path: 'home', component: HomeComponent, title: 'Home' },
  { path: 'menu', component: MenuComponent, title: 'Menu' },
  { path: 'aboutus', component: AboutUsComponent, title: 'About us' },
  { path: 'categories', component: CategoriesComponent, title: 'Categories' },
  {
    path: 'productlist',
    component: ProductListComponent,
    title: 'Product List',
  },
  //   need to modifie title of product details depend on product name
  {
    path: 'product/:id',
    component: ProductDetailsComponent,
    title: 'Product Details',
  },
  { path: 'cart', component: CartComponent, title: 'Cart' },
  { path: 'contact', component: ContactusComponent, title: 'Get In Touch' },
  { path: '**', component: NotfoundComponent, title: 'Not Found :|' },
];
