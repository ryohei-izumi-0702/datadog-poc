import { Injectable } from '@angular/core';
import { datadogLogs } from '@datadog/browser-logs';
import * as pkg from '../../package.json';
import type { Logger, LogsInitConfiguration } from '@datadog/browser-logs';

@Injectable({
  providedIn: 'root',
})
export class DatadogService {
  constructor() {}

  get logger(): Logger {
    return datadogLogs.logger;
  }

  init() {
    const { datadog } = pkg;
    const {
      clienttoken: clientToken,
      service,
      env,
      site,
      version
    } = datadog;
    const config: LogsInitConfiguration = {
      clientToken,
      site,
      service,
      env,
      version,
      forwardErrorsToLogs: true,
    };
    datadogLogs.init({
      clientToken: config.clientToken,
      site: config.site,
      service: config.service,
      env: config.env,
      forwardErrorsToLogs: config.forwardErrorsToLogs,
    });
  }
}
