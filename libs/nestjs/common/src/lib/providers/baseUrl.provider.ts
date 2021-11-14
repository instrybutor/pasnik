import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const BASE_URL = 'BASE_URL';

export const baseUrlProvider: Provider = {
  provide: BASE_URL,
  useFactory: (configService) => {
    const isSecure = configService.get('SSL') === 'true';
    return `${isSecure ? 'https' : 'http'}://${configService.get('BASE_URL')}`;
  },
  inject: [ConfigService],
};
