import { Component, OnInit } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable, throwError, catchError } from 'rxjs';
import { DatadogService } from './datadog.service';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss']
})
export class AppComponent implements OnInit {
  title = 'datadogPoc';

  /**
   * Creates an instance of AppComponent.
   * @param {DatadogService} _datadog
   * @memberof AppComponent
   */
  constructor(
    private _http: HttpClient,
    private _datadog: DatadogService
  ) {

  }

  /**
   *
   *
   * @type {Observable<string>}
   * @memberof AppComponent
   */
  public version$: Observable<string> = this._datadog.version$;

  /**
   *
   *
   * @memberof AppComponent
   */
  ngOnInit(): void {}

  onClick(args: 0 | 1 = 1) {
    alert('onClick');
    if (args === 0) {
      try {
        const y: unknown = undefined;
        JSON.parse(y as string);
      } catch (err) {
        this._datadog.logger.info('Button clicked', { name: 'buttonName', id: 123 });
        this._datadog.logger.error('onClick error', err as Error);
        throw err;
      }
    } else {
      this._http.get('ssdsdfsdf').pipe(
        catchError(err => throwError(err)),
      ).subscribe();
    }

    // const err = new Error('Error');
  }
}
