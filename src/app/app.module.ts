import { NgModule, ErrorHandler as DefaultErrorHandler, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HttpClientModule } from '@angular/common/http';
import { DatadogService } from './datadog.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppErrorHandler as CustomErrorHandler } from './app-error-handler';
export const AppErrorHandlerProvider: Provider = {
  provide: DefaultErrorHandler,
  useClass: CustomErrorHandler,
  // multi: true,
  deps: [DatadogService],
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
  ],
  providers: [],// AppErrorHandlerProvider
  bootstrap: [AppComponent]
})
export class AppModule { }
