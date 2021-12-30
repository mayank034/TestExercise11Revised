import logger from '../core/logger';
import { createConnection, Connection } from 'typeorm';
import connectionOptions from './ormConfig';

export class DBConnection {
  public static conn: Connection;

  public static async databaseConnection(): Promise<void> {
    return createConnection(connectionOptions)
      .then((connection) => {
        this.conn = connection;
        logger.info('Connected to DB');
      })
      .catch((error) => {
        logger.error('Not Connected to DB');
        logger.error(error);
      });
  }

  public static closeConnection(): Promise<void> {
    return this.conn.close();
  }
}
