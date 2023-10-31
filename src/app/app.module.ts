import { NgModule, ErrorHandler as DefaultErrorHandler, Provider } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { DatadogService } from './datadog.service';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { AppErrorHandler as CustomErrorHandler } from './app-error-handler';
export const AppErrorHandlerProvider: Provider = {
  provide: DefaultErrorHandler,
  useClass: CustomErrorHandler,
  deps: [DatadogService],
};

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    BrowserModule,
    AppRoutingModule
  ],
  providers: [AppErrorHandlerProvider],
  bootstrap: [AppComponent]
})
export class AppModule { }
