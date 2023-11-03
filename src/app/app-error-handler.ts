import { Injectable, Injector, ErrorHandler, NgZone } from '@angular/core';
import { DatadogService } from './datadog.service';
import { HttpErrorResponse } from '@angular/common/http';

/**
 *
 *
 * @export
 * @interface IErrorLike
 * @extends {Error}
 */
export interface IErrorLike extends Error {
  originalError?: IErrorLike | Error;
  ngOriginalError?: IErrorLike | Error;
  rejection?: IErrorLike | Error;
}

/**
 *
 *
 * @export
 * @class AppErrorHandler
 * @implements {ErrorHandler}
 */
@Injectable({
  providedIn: 'root',
})
export class AppErrorHandler implements ErrorHandler {
  /**
   * Creates an instance of AppErrorHandler.
   * @param {DatadogService} _datadog
   * @param {Injector} _injector
   * @param {NgZone} _ngZone
   * @memberof AppErrorHandler
   */
  public constructor(private _datadog: DatadogService, private _injector: Injector, private _ngZone: NgZone) {}

  /**
   *
   *
   * @param {IErrorLike} wrappedError
   * @returns {void}
   * @memberof AppErrorHandler
   */
  public handleError(wrappedError: IErrorLike): void {
    console.log(`wrappedError.ngOriginalError=${wrappedError.ngOriginalError}`)
    console.log(`wrappedError.originalError=${wrappedError.originalError}`)
    console.log(`wrappedError.rejection=${wrappedError.rejection}`)
    console.log(`wrappedError.isError=${wrappedError instanceof Error}`)
    console.error(wrappedError) ;
    // const error: IErrorLike = this._findContextError(wrappedError);
    // console.log(wrappedError, error);
    // const isError = error instanceof Error;
    // const message: string = this._getErrorMessage(error);
    // if (error instanceof HttpErrorResponse) {
    //   error instanceof HttpErrorResponse && console.error(Error(error.message));
    // } else {
    //   isError ? console.error(error) : this._datadog.logger.error(message, error as Error);
    // }
  }

  /**
   *
   * @description 例外は必ずしもエラーとは限らない(e.g. `throw 123`)ので適切に元のエラーをたどる。またangularの場合、元のエラーをzonejsがラップする仕様なのでそのあたりも考慮。
   * @see https://dev.to/constjs/comment/e56f
   * @see https://github.com/angular/angular/blob/10.0.x/packages/core/src/util/errors.ts
   * @see https://github.com/angular/angular/blob/master/packages/core/src/errors.ts
   * @see https://github.com/angular/angular/blob/master/packages/core/src/error_handler.ts
   * @private
   * @param {IErrorLike} wrappedError
   * @return {IErrorLike}
   * @memberof AppErrorHandler
   */
  private _findContextError(wrappedError: IErrorLike): IErrorLike {
    let error: IErrorLike | undefined = wrappedError;
    console.log(wrappedError);
    while (error && this._getOriginalError(error)) {
      console.log(error);
      error = this._getOriginalError(error);
    }

    if (error instanceof Error) {
      return error;
    }

    // error = this._getRejection(wrappedError);
    // while (error && this._getRejection(error)) {
    //   error = this._getRejection(error);
    // }

    // if (error instanceof Error) {
    //   return error;
    // }

    return wrappedError;
  }

  /**
   *
   * @description angularの旧仕様っぽい。デバッグしたが、この様になるケースは発見できなかったがsentryのドキュメントやangularのcoreの実装はこれに準ずる。
   * @private
   * @param {IErrorLike} error
   * @return {IErrorLike | undefined}
   * @memberof AppErrorHandler
   */
  private _getOriginalError(error: IErrorLike): IErrorLike | undefined {
    return error['originalError'] || error['ngOriginalError'];
  }

  /**
   *
   * @description Zone.jsがエラーをラップするので大抵ここにもとのエラーが入っている
   * @private
   * @param {IErrorLike} error
   * @return {IErrorLike | undefined}
   * @memberof AppErrorHandler
   */
  private _getRejection(error: IErrorLike): IErrorLike | undefined {
    return error['rejection'];
  }

  /**
   *
   * @description エラーメッセージの取得
   * @private
   * @param {IErrorLike} error
   * @return {string}
   * @memberof AppErrorHandler
   */
  private _getErrorMessage(error: IErrorLike): string {
    if (error.message) {
      return error.message;
    }

    return error.toString();
  }
}
