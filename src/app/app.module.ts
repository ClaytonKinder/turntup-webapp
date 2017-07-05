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
import { AuthenticationService} from './services/authentication/authentication.service';
// Directives

// Resolves
import { CurrentUserResolve} from './resolves/current-user/current-user.resolve';
// Guards
import { LoggedInGuard } from './guards/logged-in/logged-in.guard';
import { LoggedOutGuard } from './guards/logged-out/logged-out.guard';
// Modules
import { MaterialModule } from '@angular/material';
import { HttpModule } from '@angular/http';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { ToastModule } from 'ng2-toastr/ng2-toastr';


const appRoutes: Routes = [
  // { path: 'register', component: RegisterComponent, canActivate: [LoggedOutGuard] },
  // { path: 'login', component: LoginComponent, canActivate: [LoggedOutGuard] },
  { path: 'app', component: PostloginComponent, canActivate: [LoggedInGuard], resolve: { currentUser: CurrentUserResolve },
    children: [
      { path: '', redirectTo: '', pathMatch: 'full' },
      { path: 'switch', component: SwitchComponent },
      { path: 'map', component: MapComponent },
    ]
  },
  {
    path: '',
    canActivate: [LoggedOutGuard],
    children: [
      { path: 'register', component: RegisterComponent,  },
      { path: 'login', component: LoginComponent },
    ]
  },
  { path: '',   redirectTo: '/login', pathMatch: 'full', canActivate: [LoggedOutGuard] },
  { path: '**',   redirectTo: '/login', pathMatch: 'full', canActivate: [LoggedOutGuard] },
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
    AuthenticationService,
    LoggedOutGuard,
    LoggedInGuard,
    CurrentUserResolve
  ],
  bootstrap: [AppComponent]
})
export class AppModule { }
