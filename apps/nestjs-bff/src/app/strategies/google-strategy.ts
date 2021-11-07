import { Inject, Injectable } from '@nestjs/common';
import { Client, StrategyOptions, UserinfoResponse } from 'openid-client';
import { GoogleStrategyOptions } from './google-strategy.factory';
import { OidcStrategy } from './oidc-strategy';

@Injectable()
export class GoogleStrategy extends OidcStrategy {
  client: Client;

  constructor(
    @Inject(GoogleStrategyOptions) readonly options: StrategyOptions
  ) {
    super();
    this.client = options.client;
  }

  createUser(userInfo: UserinfoResponse) {}
}
