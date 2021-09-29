import { Strategy } from 'passport-strategy';
import { OAuth2Client } from 'google-auth-library';
import { Request } from 'express';
import { Profile } from 'passport';
import { UserEntity } from '../entities/user.entity';

export interface GoogleIdTokenOptions {
  clientID: string;
  clientSecret: string;
}

export type ValidateCallback = (
  profile: Profile,
) => Promise<UserEntity>;

export class GoogleIdTokenStrategy extends Strategy {
  name = 'google-token';
  client: OAuth2Client;
  constructor(
    private readonly options: GoogleIdTokenOptions,
    private readonly verify: ValidateCallback
  ) {
    super();
    if (!verify) {
      throw new TypeError('CustomStrategy requires a verify callback');
    }
    this.client = new OAuth2Client(options.clientID, options.clientSecret);
  }

  async authenticate(req: Request) {
    const accessToken = req.query.access_token as string;

    const userProfile = await this.getUserProfile(accessToken);

    this.verify(userProfile)
      .then((user) => {
        if (user) {
          this.success(user);
        } else {
          this.fail(401);
        }
      }).catch((error: Error) => {
        return this.error(error);
      });
  }

  private async getUserProfile(idToken: string): Promise<Profile> {
    const ticket = await this.client.verifyIdToken({
      idToken,
      audience: this.options.clientID,
    });
    const payload = ticket.getPayload();
    if (!payload) {
      this.fail(401);
    }

    return {
      provider: 'google',
      displayName: payload.name,
      emails: [{ value: payload.email }],
      name: {
        familyName: payload.family_name,
        givenName: payload.given_name,
      },
      id: payload.sub,
    };
  }
}
