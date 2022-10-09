import type { Request, Response, RequestHandler as Middleware, NextFunction } from 'express';

declare global {
  type User = { username: string; password: string };

  type Method =
    | 'get'
    | 'head'
    | 'post'
    | 'put'
    | 'delete'
    | 'connect'
    | 'options'
    | 'trace'
    | 'patch';

  type Handler = (req: Request, res: Response) => any;

  type HandlerAll = (req: Request, res: Response, next: NextFunction)  => any;

  type Route = {
    method: Method;
    path: string;
    middleware: Middleware[];
    handler: Handler;
  };
}
