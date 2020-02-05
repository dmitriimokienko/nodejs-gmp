import { injectable, inject } from 'inversify';
import { TYPES } from '../../../types';
import { UserRepository, UserService } from '../interfaces';
import { UserModel, UserDTO } from '../model';
import { UserUpdateType } from '../types';
import { createSequelizeFindOptions } from '../../../utils';

@injectable()
export class UserServiceImpl implements UserService {
    private readonly userRepository: UserRepository;

    constructor(@inject(TYPES.UserRepository) userRepository: UserRepository) {
        this.userRepository = userRepository;
    }

    public select(loginSubstring?: string, limit?: string): Promise<UserModel[]> {
        const options = createSequelizeFindOptions({ login: loginSubstring }, limit);
        return this.userRepository.select(options);
    }

    public getById(id: string): Promise<UserModel> {
        return this.userRepository.getById(id);
    }

    public async create({ login, password, age }: UserDTO): Promise<UserModel> {
        const dto: UserDTO = new UserDTO(login, password, age);
        return this.userRepository.create(dto);
    }

    public update(id: string, { password, age }: UserUpdateType): Promise<UserModel> {
        return this.userRepository.update(id, { password, age });
    }

    public delete(id: string): Promise<UserModel> {
        return this.userRepository.delete(id);
    }
}
