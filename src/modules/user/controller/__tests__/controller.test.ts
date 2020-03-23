// import express, { Application, Request, Response } from 'express';
// import request from 'supertest';
import httpMocks from 'node-mocks-http';
import { app } from '../../../../server';
import { UserController } from '../controller';
import { UserService } from '../../interfaces';
import { UserDTO } from '../../model';

const mockUser1: UserDTO = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc93',
    login: 'User1',
    password: '123456fdgdfDFGDFg14',
    age: 38
};

const mockUser2: UserDTO = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc84',
    login: 'User2',
    password: '123456fdgdfDFGDFg14',
    age: 45
};

const mockUsers: UserDTO[] = [mockUser1, mockUser2];

// app.get('/users', (_req: Request, res: Response) => {
//     res.status(200).json(mockUser);
// });

jest.mock('../../../../middlewares/check-token', () => ({
    checkToken: jest.fn()
}));

describe('Test UserController', () => {
    let req: any = null;
    let res: any = null;
    const next = jest.fn();

    const Service: any = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(mockUsers),
        getById: jest.fn(userId => Promise.resolve(mockUsers.find(({ id }) => userId === id))),
        create: jest.fn(({ login, password, age }) =>
            Promise.resolve({
                id: 'e887f65e-f46e-464a-867d-75cbed50d484',
                login,
                password,
                age
            })
        ),
        update: jest.fn((userId, { password, age }) => {
            const user: UserDTO | undefined = mockUsers.find(({ id }) => userId === id);
            if (!user) {
                return Promise.reject('User not found');
            }
            return Promise.resolve({
                id: userId,
                login: user.login,
                password,
                age
            });
        }),
        delete: jest.fn(userId => Promise.resolve(mockUsers.find(({ id }) => userId === id)))
    }));

    const service: UserService = new Service();
    const controller = new UserController(service);

    beforeEach(() => {
        controller.register(app);
        res = httpMocks.createResponse();
    });

    it('should return correct result by "get" method', async () => {
        expect.assertions(2);

        // @ts-ignore
        await controller.get(req, res, next);

        expect(res._getJSONData()).toEqual(mockUsers);
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "getById" method', async () => {
        expect.assertions(2);

        req = { params: { id: 'b889f6ee-f86e-464a-867d-75cbed50dc84' } };
        // @ts-ignore
        await controller.getById(req, res, next);

        expect(res._getJSONData()).toEqual(mockUser2);
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "create" method', async () => {
        expect.assertions(2);

        const login = 'User3';
        const password = 'QWe123@!#rt';
        const age = 25;

        req = { body: { login, password, age } };
        // @ts-ignore
        await controller.create(req, res, next);

        expect(res._getJSONData()).toEqual({
            id: 'e887f65e-f46e-464a-867d-75cbed50d484',
            login,
            password,
            age
        });
        expect(res.statusCode).toBe(201);
    });

    it('should return correct result by "update" method', async () => {
        expect.assertions(2);

        const id = 'b889f6ee-f86e-464a-867d-75cbed50dc84';
        const password = 'QWe123@!#rt';
        const age = 25;

        req = { params: { id }, body: { password, age } };
        // @ts-ignore
        await controller.update(req, res, next);

        expect(res._getJSONData()).toEqual({
            id,
            login: 'User2',
            password,
            age
        });
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "delete" method', async () => {
        expect.assertions(1);

        req = { params: { id: 'b889f6ee-f86e-464a-867d-75cbed50dc84' } };
        // @ts-ignore
        await controller.delete(req, res, next);

        expect(res.statusCode).toBe(204);
    });
});
