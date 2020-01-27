import {Request, Response} from 'express';
import Boom from '@hapi/boom';

export const methodNotAllowed = (_req: Request, res: Response) => {
    res.status(405).json(Boom.methodNotAllowed('that method is not allowed'));
};
