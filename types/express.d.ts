import type { Request, Response, RequestHandler as Middleware, NextFunction } from 'express';

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

declare global {
  type User = { username: string; password: string };

  type Handler = (req: Request, res: Response) => any;

  type HandlerAll = (req: Request, res: Response, next: NextFunction)  => any;

  type Route = {
    method: Method;
    path: string;
    middleware: Middleware[];
    handler: Handler;
  };
}
