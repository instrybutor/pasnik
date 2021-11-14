import { Provider } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

export const API_URL = 'API_URL';

export const apiUrlProvider: Provider = {
  provide: API_URL,
  useFactory: (configService) => {
    const isSecure = configService.get('SSL') === 'true';
    return `${isSecure ? 'https' : 'http'}://${configService.get('API_URL')}`;
  },
  inject: [ConfigService],
};
