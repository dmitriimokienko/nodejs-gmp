import httpMocks from 'node-mocks-http';
import { app } from '../../../../server';
import { GroupController } from '../controller';
import { GroupService } from '../../interfaces';
import { GroupDTO } from '../../model';
import { Permission } from '../../constants';

const mockGroup1: GroupDTO = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc97',
    name: 'Group1',
    permissions: [Permission.READ]
};

const mockGroup2: GroupDTO = {
    id: 'b879f6ee-f86e-464a-867d-75cbed50dc89',
    name: 'Group2',
    permissions: [Permission.READ, Permission.WRITE, Permission.SHARE]
};

const mockGroups: GroupDTO[] = [mockGroup1, mockGroup2];

const mockUser1 = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc93',
    login: 'User1',
    password: '123456fdgdfDFGDFg14',
    age: 38
};

const mockUser2 = {
    id: 'b889f6ee-f86e-464a-867d-75cbed50dc84',
    login: 'User2',
    password: '123456fdgdfDFGDFg14',
    age: 45
};

const mockUsers = [mockUser1, mockUser2];

jest.mock('../../../../middlewares/check-token', () => ({
    checkToken: jest.fn()
}));

describe('Test GroupController', () => {
    let req: any = null;
    let res: any = null;
    const next = jest.fn();

    const Service: any = jest.fn(() => ({
        select: jest.fn().mockResolvedValue(mockGroups),
        getById: jest.fn(groupId => Promise.resolve(mockGroups.find(({ id }) => groupId === id))),
        create: jest.fn(({ name, permissions }) =>
            Promise.resolve({
                id: 'e887f65e-f46e-464a-867d-75cbed50d484',
                name,
                permissions
            })
        ),
        update: jest.fn((groupId, permissions) => {
            const group: GroupDTO | undefined = mockGroups.find(({ id }) => groupId === id);
            if (!group) {
                return Promise.reject('Group not found');
            }
            return Promise.resolve({
                id: groupId,
                name: group.name,
                permissions
            });
        }),
        delete: jest.fn(groupId => Promise.resolve(mockGroups.find(({ id }) => groupId === id))),
        getUsers: jest.fn().mockResolvedValue(mockUsers),
        addUsersToGroup: jest.fn((groupId, [userId]) =>
            Promise.resolve({ id: 'e887f65e-f46e-464a-867d-75cbed50d484', groupId, userId })
        )
    }));

    const service: GroupService = new Service();
    const controller = new GroupController(service);

    beforeEach(() => {
        controller.register(app);
        res = httpMocks.createResponse();
    });

    it('should return correct result by "get" method', async () => {
        expect.assertions(2);

        // @ts-ignore
        await controller.get(req, res, next);

        expect(res._getJSONData()).toEqual(mockGroups);
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "getById" method', async () => {
        expect.assertions(2);

        req = { params: { id: 'b879f6ee-f86e-464a-867d-75cbed50dc89' } };
        // @ts-ignore
        await controller.getById(req, res, next);

        expect(res._getJSONData()).toEqual(mockGroup2);
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "create" method', async () => {
        expect.assertions(2);

        const id = 'e887f65e-f46e-464a-867d-75cbed50d484';
        const name = 'Group3';
        const permissions = [Permission.READ, Permission.UPLOAD_FILES, Permission.DELETE];

        req = { body: { name, permissions } };
        // @ts-ignore
        await controller.create(req, res, next);

        expect(res._getJSONData()).toEqual({ id, name, permissions });
        expect(res.statusCode).toBe(201);
    });

    it('should return correct result by "update" method', async () => {
        expect.assertions(2);

        const id = 'b879f6ee-f86e-464a-867d-75cbed50dc89';
        const name = 'Group2';
        const permissions = [Permission.READ, Permission.UPLOAD_FILES, Permission.DELETE];

        req = { params: { id }, body: { permissions } };
        // @ts-ignore
        await controller.update(req, res, next);

        expect(res._getJSONData()).toEqual({ id, name, permissions });
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "delete" method', async () => {
        expect.assertions(1);

        req = { params: { id: 'b879f6ee-f86e-464a-867d-75cbed50dc89' } };
        // @ts-ignore
        await controller.delete(req, res, next);

        expect(res.statusCode).toBe(204);
    });

    it('should return correct result by "getUsers" method', async () => {
        expect.assertions(2);

        // @ts-ignore
        await controller.getUsers(req, res, next);

        expect(res._getJSONData()).toEqual(mockUsers);
        expect(res.statusCode).toBe(200);
    });

    it('should return correct result by "addUsersToGroup" method', async () => {
        expect.assertions(2);

        const id = 'e887f65e-f46e-464a-867d-75cbed50d484';
        const groupId = mockGroup2.id;
        const userId = mockUser1.id;

        req = { params: { id: groupId }, body: { userIds: [userId] } };
        // @ts-ignore
        await controller.addUsersToGroup(req, res, next);

        expect(res._getJSONData()).toEqual({ id, groupId, userId });
        expect(res.statusCode).toBe(201);
    });
});
