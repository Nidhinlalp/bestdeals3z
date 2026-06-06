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
    const request = ctx
      .switchToHttp()
      .getRequest<Request & { user?: unknown }>();
    return request.user;
  },
);
