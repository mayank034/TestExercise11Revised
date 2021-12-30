import * as bodyParser from 'body-parser';
import { Application } from 'express';
// import cors from 'cors';
// import swaggerUi from 'swagger-ui-express';
// import swaggerJSDoc from 'swagger-jsdoc';
// import { v4 as uuidv4 } from 'uuid';
import { DBConnection } from '../database/dbConnection';
// import errorMiddleware from '@middleware/error';
// import SwaggerDocument from '@util/swaggerDocument';
// import constant from '@config/constant';
// import { ENVIRONMENT, SENTRY_DSN } from '@config/secret';
// import * as Sentry from '@sentry/node';

export class Kernel {
  public initBodyParser(app: Application): void {
    app.use(bodyParser.json());
    app.use(bodyParser.urlencoded({ extended: false }));
  }

  // public errorMiddleware(app: Application): void {
  //   app.use(errorMiddleware);
  // }

  public databaseConnection(): Promise<void> {
    return DBConnection.databaseConnection();
  }

  // public setupSwagger(app: Application): void {
  //   if (constant.PRODUCTION !== ENVIRONMENT) {
  //     const swaggerSpecV1 = swaggerJSDoc(SwaggerDocument);
  //     app.use('/docs', swaggerUi.serveFiles(swaggerSpecV1));
  //     app.get('/docs', (req, res) => {
  //       res.send(swaggerUi.generateHTML(swaggerSpecV1));
  //     });
  //   }
  // }

  // public addCommonMiddleware(app: Application): void {
  //   const corsOptions = {
  //     origin: '*',
  //     methods: ['GET', 'POST', 'PUT', 'DELETE', 'PATCH', 'HEAD', 'OPTIONS'],
  //     allowedHeaders: '*',
  //     exposedHeaders: '*',
  //     optionsSuccessStatus: 200,
  //   };
  //   app.use(cors(corsOptions));

  //   app.all('*', (req, res, next) => {
  //     req.headers.requestUUID = uuidv4();
  //     next();
  //   });
  // }

  // public initSentry(app: Application): void {
  //   Sentry.init({ dsn: SENTRY_DSN });
  //   app.use(Sentry.Handlers.requestHandler());
  // }

  // public sentryErrorHandler(app: Application): void {
  //   app.use(Sentry.Handlers.errorHandler());
  // }
}
