import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';
import { OidcStrategy } from './strategies/oidc.strategy';

// const clientID = '1405659766870.2431479380869';
// const clientSecret = '6a06136ad71ce8f52c7bd42f7e86973c';

@Injectable()
export class SlackStrategy extends PassportStrategy(OidcStrategy, 'slack') {
  constructor() {
    super({
      // authorizationURL: 'https://slack.com/oauth/authorize',
      // tokenURL: 'https://slack.com/api/openid.connect.token',
      // scope: 'identify',
      // clientID,
      // clientSecret,
    });
  }

  async validate(response: any): Promise<any> {
    return response;
  }
}
