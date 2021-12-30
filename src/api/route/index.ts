import { Application } from 'express';
import UsersRoute from './Users.route';
import ReminderRoute from './Reminder.route';

export class Routes {
  constructor() {
  }
  public routes(app: Application): void {
    // resource and routes mapping comes here
    app.use('/api/users', UsersRoute);
    app.use('/api/reminders', ReminderRoute);
  }
}
