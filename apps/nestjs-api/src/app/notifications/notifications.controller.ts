import { Controller, Get } from '@nestjs/common';

import { OrderNotification } from './notifications.models';

@Controller('notifications')
export class NotificationsController {
  @Get()
  getAll(): OrderNotification[] {
    return [
      {
        id: '1',
        type: 'ORDER_STATUS_CHANGED',
        status: 'in-progress',
        data: {
          slug: 'sdfsd-vtq0mk',
          title: 'Pobite Gary',
        },
        createdAt: new Date('2022/1/13 10:12').toLocaleString(),
      },
      {
        id: '2',
        type: 'ORDER_STATUS_CHANGED',
        status: 'in-progress',
        data: {
          slug: 'sdfsd-vtq0mk',
          title: 'Pobite Gary',
        },
        createdAt: new Date('2022/1/13 9:12').toLocaleString(),
      },
      {
        id: '3',
        type: 'ORDER_STATUS_CHANGED',
        status: 'in-progress',
        data: {
          slug: 'sdfsd-vtq0mk',
          title: 'Pobite Gary',
        },
        createdAt: new Date('2022/1/13 8:12').toLocaleString(),
      },
    ];
  }
}
