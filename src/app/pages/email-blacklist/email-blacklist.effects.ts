import {Injectable} from '@angular/core';
import {Action} from '@ngrx/store';
import {Actions, Effect} from '@ngrx/effects';
import {Observable} from 'rxjs/Observable';
import 'rxjs/add/operator/switchMap';
import 'rxjs/add/operator/do';
import 'rxjs/add/observable/of';

import {API} from '../../core/api-endpoints.constant';

import {RestApiService} from '../../core/rest-api.service';
import {RestApiRequest} from '../../core/rest-api-request';
import * as EmailBlacklistActions from '../../_actions/email-blacklist.actions';
import * as AlertActions from '../../_actions/alert.actions';
import {EmailBlacklist} from '../../_domains/email-blacklist';

export namespace EmailBlacklistGet {
  export const REQUEST = 'EmailBlacklistEffects.REQUEST';
  export const SUCCESS = 'EmailBlacklistEffects.SUCCESS';
  export const ERROR = 'EmailBlacklistEffects.ERROR';

  export class Request implements Action {
    readonly type = REQUEST;
  }

  export class Success implements Action {
    readonly type = SUCCESS;

    constructor(public payload: EmailBlacklist) {
    }
  }

  export class Error implements Action {
    readonly type = ERROR;
  }

  @Injectable()
  export class Effects {
    @Effect() onRequest$: Observable<Action> = this.actions$
      .ofType(REQUEST)
      .switchMap(() => {
        const request = new RestApiRequest(API.BLACKLIST.QUERY);

        return this._api.send(request)
          .map(response => new Success(response))
          .catch(error => Observable.of(new Error()));
      });

    @Effect() onSuccess$: Observable<Action> = this.actions$
      .ofType(SUCCESS)
      .map((action: Success) => action.payload)
      .map((response) => new EmailBlacklistActions.Set(response));

    @Effect() onError$: Observable<Action> = this.actions$
      .ofType(ERROR)
      .map(() => new AlertActions.SetError('Cannot Get Email Blacklist Table'));

    constructor(private _api: RestApiService, private actions$: Actions) {
    }
  }
}
