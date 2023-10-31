import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { datadogLogs } from '@datadog/browser-logs';
import { datadogRum } from '@datadog/browser-rum';
import { type RumInitConfiguration } from '@datadog/browser-rum';
import type { Logger, LogsInitConfiguration } from '@datadog/browser-logs';
import { Observable, concatMap, map, take, tap } from 'rxjs';
// import * as pkg from '../../package.json';


interface IVersion {
  version: string;
}

@Injectable({
  providedIn: 'root',
})
export class DatadogService {
  /**
   * Creates an instance of DatadogService.
   * @param {HttpClient} _http
   * @memberof DatadogService
   */
  constructor(private _http: HttpClient) {
    this.init();
  }

  /**
   *
   *
   * @readonly
   * @memberof DatadogService
   */
  get version$(): Observable<string> {
    return this._http.get<IVersion>('/version.json', {
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
      reportProgress: false,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      map(({ version }) => version),
    );
  }

  /**
   *
   *
   * @readonly
   * @type {Observable<Partial<LogsInitConfiguration>>}
   * @memberof DatadogService
   */
  get config$(): Observable<Partial<LogsInitConfiguration>> {
    return this._http.get<Partial<LogsInitConfiguration>>('/datadog.json', {
      observe: 'body',
      responseType: 'json',
      withCredentials: false,
      reportProgress: false,
      headers: new HttpHeaders({
        'Content-Type': 'application/json',
      }),
    }).pipe(
      take(1),
    );
  }

  /**
   *
   *
   * @readonly
   * @type {Logger}
   * @memberof DatadogService
   */
  get logger(): Logger {
    return datadogLogs.logger;
  }

  /**
   *
   *
   * @memberof DatadogService
   */
  public init() {
    this.version$.pipe(
      concatMap((version: string) => this.config$.pipe(
        map((config: Partial<LogsInitConfiguration>) => ({
          ...config,
          version,
        }) as LogsInitConfiguration),
      )),
      tap((config: LogsInitConfiguration) => datadogLogs.init(config)),
      map((config: Partial<LogsInitConfiguration>) => config as Partial<RumInitConfiguration>),
    ).subscribe((config: Partial<RumInitConfiguration>) => {
      datadogRum.init({
        clientToken: config.clientToken as string,
        site: config.site,
        env: config.env,
        version: config.version,
        service: config.service,
        applicationId: config.applicationId as string,
        sessionSampleRate: 100,
        sessionReplaySampleRate: 100,
        trackResources: true,
        trackLongTasks: true,
        trackUserInteractions: true,
      });
    });
  }
}
