import { NextFunction, Request, Response } from 'express';
import { GroupModel } from './model';

export interface Controller {
    get(req: Request, res: Response, next: NextFunction): Promise<void>;

    getById(req: Request, res: Response, next: NextFunction): Promise<void>;

    create(req: Request, res: Response, next: NextFunction): Promise<void>;

    update(req: Request, res: Response, next: NextFunction): Promise<void>;

    delete(req: Request, res: Response, next: NextFunction): Promise<void>;
}

export interface GroupService {
    select(nameSubstring: string, count?: string): Promise<GroupModel[]>;

    getById(id: string): Promise<GroupModel>;

    create(body: any): Promise<GroupModel>;

    update(id: string, body: any): Promise<GroupModel>;

    delete(id: string): Promise<GroupModel>;
}
