import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
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
  constructor(private _datadog: DatadogService) {

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

  onClick() {
    alert('onClick');
    const err = new Error('Error');
    this._datadog.logger.info('Button clicked', { name: 'buttonName', id: 123 });
    this._datadog.logger.error('onClick error', err);
    throw err;
  }
}
