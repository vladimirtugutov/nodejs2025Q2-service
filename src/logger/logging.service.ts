import { Injectable, LoggerService, LogLevel } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';

const LOG_DIR = path.resolve(__dirname, '../../logs');
if (!fs.existsSync(LOG_DIR)) fs.mkdirSync(LOG_DIR);

@Injectable()
export class LoggingService implements LoggerService {
  private readonly logLevel: LogLevel;
  private readonly maxSizeKb: number;
  private readonly logStream: fs.WriteStream;
  private readonly errorStream: fs.WriteStream;

  constructor() {
    this.logLevel = (process.env.LOG_LEVEL || 'log') as LogLevel;
    this.maxSizeKb = parseInt(process.env.LOG_FILE_SIZE_KB || '100', 10);

    this.logStream = this.createStream('app.log');
    this.errorStream = this.createStream('error.log');
  }

  private createStream(filename: string): fs.WriteStream {
    const filePath = path.join(LOG_DIR, filename);
    this.rotateIfNeeded(filePath);
    return fs.createWriteStream(filePath, { flags: 'a' });
  }

  private rotateIfNeeded(filePath: string) {
    if (fs.existsSync(filePath)) {
      const stats = fs.statSync(filePath);
      if (stats.size >= this.maxSizeKb * 1024) {
        const backup = `${filePath}.${Date.now()}`;
        fs.renameSync(filePath, backup);
      }
    }
  }

  private shouldLog(level: LogLevel): boolean {
    const levels: LogLevel[] = ['error', 'warn', 'log', 'debug', 'verbose'];
    return levels.indexOf(level) <= levels.indexOf(this.logLevel);
  }

  private format(
    level: string,
    message: any,
    context?: string,
    trace?: string,
  ): string {
    const time = new Date().toISOString();
    return `[${time}] [${level.toUpperCase()}]${context ? ` [${context}]` : ''} ${message}${
      trace ? `\nTRACE: ${trace}` : ''
    }\n`;
  }

  private write(
    level: LogLevel,
    message: any,
    context?: string,
    trace?: string,
  ) {
    if (!this.shouldLog(level)) return;
    const formatted = this.format(level, message, context, trace);
    this.logStream.write(formatted);
    process.stdout.write(formatted);

    if (level === 'error') this.errorStream.write(formatted);
  }

  log(message: any, context?: string) {
    this.write('log', message, context);
  }

  error(message: any, trace?: string, context?: string) {
    this.write('error', message, context, trace);
  }

  warn(message: any, context?: string) {
    this.write('warn', message, context);
  }

  debug(message: any, context?: string) {
    this.write('debug', message, context);
  }

  verbose(message: any, context?: string) {
    this.write('verbose', message, context);
  }
}
