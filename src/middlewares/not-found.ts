import { Request, Response } from 'express';
import Boom from '@hapi/boom';

export const notFound = (_req: Request, res: Response) => {
    res.status(404).json(Boom.notFound('Invalid Request'));
};
