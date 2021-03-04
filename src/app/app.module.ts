import { CrudService } from './appServices/crud.service';

import { environment } from './../environments/environment';
import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './header/header.component';
import { LoginComponent } from './login/login.component';
// import {from} from 'rxjs'
import { AngularFireModule } from '@angular/fire';
import { AngularFireDatabaseModule } from '@angular/fire/database';
import { EmployeesComponent } from './employees/employees.component';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { PageNotFoundComponent } from './page-not-found/page-not-found.component';
import { HomeComponent } from './home/home.component';
import { HeaderSliderComponent } from './header-slider/header-slider.component';
import { AuthGuard } from './auth.guard';
import { AuthService } from './appServices/auth.service';

// ReactiveFormsModule,
// FormsModule,
@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
    LoginComponent,
    EmployeesComponent,
    PageNotFoundComponent,
    HomeComponent,
    HeaderSliderComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireDatabaseModule,
    FormsModule,
    ReactiveFormsModule,
    AngularFireAuthModule
  ],
  providers: [AuthGuard,CrudService,AuthService],
  bootstrap: [AppComponent]
})
export class AppModule { }
