import { NgModule,CUSTOM_ELEMENTS_SCHEMA  } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { AppComponent } from './app.component';
import { NotFoundComponent } from './components/not-found/not-found.component';
import { HomeComponent } from './components/home/home.component';
import { AccessDeniedComponent } from './components/access-denied/access-denied.component';
import { TemplateModule } from './template/template.module';
import { AppRoutingModule } from './app-routing.module';
import { NgxSpinnerModule } from "ngx-spinner";
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { SpinnerInterceptor } from './interceptor/spinner.interceptor';
import { ToastrModule } from 'ngx-toastr';
import { SendReqAdInterceptor } from './interceptor/send-req-ad.interceptor';
import { UsersService } from './services/users.service';
import { SharedModule } from './shared/shared.module';

export const httpInterceptorProviders = [
   { provide: HTTP_INTERCEPTORS,
    useClass: SpinnerInterceptor, multi: true },
    { provide: HTTP_INTERCEPTORS,
      useClass: SendReqAdInterceptor, multi: true }
];

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    HomeComponent,
    AccessDeniedComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    TemplateModule,
    BrowserAnimationsModule,
    ToastrModule.forRoot(), // ToastrModule added
    NgxSpinnerModule,
    HttpClientModule,
    SharedModule
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
  providers: [httpInterceptorProviders,UsersService],
  bootstrap: [AppComponent]
})
export class AppModule { }
