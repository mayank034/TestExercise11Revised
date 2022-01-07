import { Request, Response, NextFunction } from 'express';
import { ResponseParser } from '../util/response-parser';
import logger from '../core/logger';

export class HttpRequestValidator {
  private responseParser: ResponseParser;

  // eslint-disable-next-line @typescript-eslint/explicit-member-accessibility
  constructor() {
    this.responseParser = new ResponseParser();
  }

  /**
   * Private method to validate data against Joi schema
   *
   * @param data
   * @param schema
   */
  // eslint-disable-next-line @typescript-eslint/explicit-module-boundary-types
  public validate(type: 'body' | 'params' | 'query' | 'headers', schema: any): any {
    return (req: Request, res: Response, next: NextFunction) => {
      const data = req[type];
      const { error } = schema.validate(data);
      if (error === undefined) {
        next();
        return;
      }
      logger.error(error);
      // eslint-disable-next-line @typescript-eslint/no-floating-promises
      this.handleValidationError(error);
      this.responseParser.send(res);
    };
  }

  // eslint-disable-next-line @typescript-eslint/require-await
  private async handleValidationError(error: any): Promise<any> {
    const err: any = [];
    let errorMessage = '';
    error.details.forEach((element: { message: any; context: any }) => {
      const { message, context } = element;
      const splitMessage = message.split('.');
      const shouldTranslate = splitMessage[0] === 'i18n' && splitMessage.length === 2;
      // eslint-disable-next-line no-underscore-dangle
      errorMessage = shouldTranslate ? i18n.__(splitMessage[1]) : message;
      err.push({
        code: errorMessage,
        label: context.key,
      });
    });
    this.responseParser.setHttpCode(400).setStatus(false).setMessage(errorMessage);
  }
}
