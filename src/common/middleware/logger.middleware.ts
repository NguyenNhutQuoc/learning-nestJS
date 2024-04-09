import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import fs from 'fs';
import path from 'path';

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const logFilePath = path.join(__dirname, 'logs.txt');
    const logMessage = `${new Date().toISOString()} - ${req.method} ${req.url}\n`;

    fs.appendFile(logFilePath, logMessage, (err) => {
      if (err) {
        console.error('Error writing to log file:', err);
      }
    });

    next();
  }
}
