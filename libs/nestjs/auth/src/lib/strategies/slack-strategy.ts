import { Inject, Injectable } from '@nestjs/common';
import { Client, StrategyOptions, UserinfoResponse } from 'openid-client';
import { CreateOidcStrategy } from './oidc-strategy';
import { AuthService } from '../services/auth.service';
import { InvitationsService } from '../services/invitations.service';
import { SlackStrategyOptions } from './slack-strategy-options.factory';

@Injectable()
export class SlackStrategy extends CreateOidcStrategy('slack') {
  client: Client;

  constructor(
    @Inject(SlackStrategyOptions) readonly options: StrategyOptions,
    private readonly invitationsService: InvitationsService,
    private readonly authService: AuthService
  ) {
    super(options);
    this.client = options.client;
  }

  createUser(userInfo: UserinfoResponse) {
    return this.authService.upsertSlackUser(userInfo);
  }

  canAccess({ email }: UserinfoResponse) {
    return this.invitationsService.canAccess(email);
  }
}
