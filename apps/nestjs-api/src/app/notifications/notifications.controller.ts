import { Controller, Get } from '@nestjs/common';
import { CurrentUser } from '@pasnik/nestjs/auth';
import { UserEntity } from '@pasnik/nestjs/database';

import { NotificationService } from './notifications.service';

@Controller('notifications')
export class NotificationsController {
  constructor(private notificationService: NotificationService) {}

  @Get()
  getAll(@CurrentUser() user: UserEntity) {
    return this.notificationService.getNotifications(user.id);
  }
}
