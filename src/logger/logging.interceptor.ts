import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
} from '@nestjs/common';
import { Observable, tap } from 'rxjs';
import { LoggingService } from './logging.service';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: LoggingService) {}

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const req = context.switchToHttp().getRequest();
    const { method, url, body, query } = req;

    this.logger.log(`Incoming request: ${method} ${url}`);
    this.logger.debug(`Query: ${JSON.stringify(query)}`);
    this.logger.debug(`Body: ${JSON.stringify(body)}`);

    const now = Date.now();
    return next.handle().pipe(
      tap(() => {
        const res = context.switchToHttp().getResponse();
        this.logger.log(
          `Response for ${method} ${url} - ${res?.statusCode} - ${Date.now() - now}ms`,
        );
      }),
    );
  }
}
