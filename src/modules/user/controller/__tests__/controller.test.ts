// import express, { Application, Request, Response } from 'express';
// import request from 'supertest';
import { noop } from 'lodash';
import httpMocks from 'node-mocks-http';
//
import { app } from '../../../../server';
import { UserController } from '../controller';
import { UserService } from '../../interfaces';
import { UserDTO } from '../../model';

const mockUser: UserDTO = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc93',
    login: 'Dima',
    password: '123456fdgdfDFGDFg14',
    age: 25
};

// app.get('/users', (_req: Request, res: Response) => {
//     res.status(200).json(mockUser);
// });

jest.mock('../../../../middlewares/check-token', () => ({
    checkToken: jest.fn()
}));

describe('Test UserController', () => {
    let controller: UserController;

    beforeEach(() => {
        // @ts-ignore
        const Service: any = jest.fn<UserService>(() => ({
            select: jest.fn().mockResolvedValue([mockUser])
        }));
        const service: UserService = new Service();

        controller = new UserController(service);
        controller.register(app);
    });

    it(`should register user's routing`, async () => {
        expect.assertions(2);

        const res = httpMocks.createResponse();
        // @ts-ignore
        await controller.get(null, res, noop);

        expect(res._getJSONData()).toEqual([
            {
                age: 25,
                id: 'b889f6ee-f86e-464a-867d-75cbed50dc93',
                login: 'Dima',
                password: '123456fdgdfDFGDFg14'
            }
        ]);
        expect(res.statusCode).toBe(200);
    });
});
