import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule, ReactiveFormsModule  } from '@angular/forms';
// Components
import { AppComponent } from './app.component';
import { RegisterFormComponent } from './components/register-form/register-form.component';
import { LoginFormComponent } from './components/login-form/login-form.component';
//Pages
import { RegisterComponent } from './pages/register/register.component';
import { LoginComponent } from './pages/login/login.component';
import { PostloginComponent } from './pages/postlogin/postlogin.component';
import { SwitchComponent } from './pages/switch/switch.component';
import { MapComponent } from './pages/map/map.component';
// Services
import { UserService} from './services/user/user.service';
// Directives

// Guards
import { AuthGuard } from './guards/auth.guard';
// Modules
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


const appRoutes: Routes = [
  { path: 'register', component: RegisterComponent },
  { path: 'login', component: LoginComponent },
  { path: 'app', component: PostloginComponent, canActivate: [AuthGuard],
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'switch', component: SwitchComponent },
      { path: 'map', component: MapComponent },
    ]
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full' },
  { path: '**', component: LoginComponent }
];

@NgModule({
  declarations: [
    AppComponent,
    RegisterComponent,
    RegisterFormComponent,
    LoginComponent,
    LoginFormComponent,
    PostloginComponent,
    SwitchComponent,
    MapComponent
  ],
  imports: [
    RouterModule.forRoot(appRoutes),
    BrowserModule,
    MaterialModule,
    HttpModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    ToastModule.forRoot()
  ],
  providers: [
    UserService,
    AuthGuard
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
