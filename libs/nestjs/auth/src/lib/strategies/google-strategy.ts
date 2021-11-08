import { Inject, Injectable } from '@nestjs/common';
import { Client, StrategyOptions, UserinfoResponse } from 'openid-client';
import { GoogleStrategyOptions } from './google-strategy.factory';
import { CreateOidcStrategy } from './oidc-strategy';
import { AuthService } from '../services/auth.service';
import { InvitationsService } from '../services/invitations.service';

@Injectable()
export class GoogleStrategy extends CreateOidcStrategy('google') {
  client: Client;

  constructor(
    @Inject(GoogleStrategyOptions) readonly options: StrategyOptions,
    private readonly invitationsService: InvitationsService,
    private readonly authService: AuthService
  ) {
    super(options);
    this.client = options.client;
  }

  createUser(userInfo: UserinfoResponse) {
    return this.authService.upsertOidcUser(userInfo, 'google');
  }

  canAccess({ email }: UserinfoResponse) {
    return this.invitationsService.canAccess(email);
  }
}
