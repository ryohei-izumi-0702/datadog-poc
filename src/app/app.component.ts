import { Component, OnInit } from '@angular/core';
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
   * @memberof AppComponent
   */
  ngOnInit(): void {
    this._datadog.init();
  }

  onClick() {
    throw new Error('Error');
  }
}
