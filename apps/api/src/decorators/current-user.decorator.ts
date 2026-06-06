import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import type { Request } from 'express';

// =============================================================================
// @CurrentUser() — Parameter Decorator
// =============================================================================
// Usage: async getProfile(@CurrentUser() user: UserPayload) {}
// TODO: Connect to JWT strategy payload when Auth module is implemented
// =============================================================================

export const CurrentUser = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request = ctx.switchToHttp().getRequest<Request>();
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    return (request as any).user;
  }
);
