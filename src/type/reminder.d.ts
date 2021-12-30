export interface CreateReminder {
    description: string;
    createdAt: Date;

  }

  export interface UpdateReminderDescription {
    oldDescription: string;
    newDescription: string;
  }

  export interface UpdateReminderDate {
    oldDate: Date;
    newDate: Date;
  }

  export interface UpdateReminderStatus {
    reminderNumber: number;
  }

  export interface ReminderDate {
    reminderDate: Date;
    filter?: boolean;
  }