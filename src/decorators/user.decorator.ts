import { ExecutionContext, createParamDecorator } from '@nestjs/common';
import { Request } from 'express';
export interface IGetUserAuthInfoRequest extends Request {
  user: any;
}
export const GetUser = createParamDecorator(
  (data: string | undefined, ctx: ExecutionContext) => {
    const request: IGetUserAuthInfoRequest = ctx.switchToHttp().getRequest();
    return data ? request.user[data] : request.user;
  },
);
