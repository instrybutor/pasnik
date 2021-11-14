import { Inject, Injectable } from '@nestjs/common';
import { StrategyOptions, UserinfoResponse } from 'openid-client';
import { GoogleStrategyOptions } from './google-strategy-options.factory';
import { CreateOidcStrategy } from './oidc-strategy';
import { AuthService } from '../services/auth.service';
import { InvitationsService } from '../services/invitations.service';

@Injectable()
export class GoogleStrategy extends CreateOidcStrategy('google') {
  constructor(
    @Inject(GoogleStrategyOptions) readonly options: StrategyOptions,
    readonly invitationsService: InvitationsService,
    private readonly authService: AuthService
  ) {
    super(options, invitationsService);
  }

  createUser(userInfo: UserinfoResponse) {
    return this.authService.upsertGoogleUser(userInfo);
  }
}
