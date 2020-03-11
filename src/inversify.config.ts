import { Container } from 'inversify';
import { TYPES } from './types';
import { RegistrableController } from './interfaces';

import { LoginController } from './modules/login/controller';

import { GroupRepository, GroupService } from './modules/group/interfaces';
import { GroupController } from './modules/group/controller';
import { GroupServiceImpl } from './modules/group/service';
import { GroupRepositoryImplDb } from './modules/group/data-access';

import { UserRepository, UserService } from './modules/user/interfaces';
import { UserController } from './modules/user/controller';
import { UserServiceImpl } from './modules/user/service';
import { UserRepositoryImplDb } from './modules/user/data-access';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(LoginController);

container.bind<RegistrableController>(TYPES.Controller).to(UserController);
container.bind<UserService>(TYPES.UserService).to(UserServiceImpl);
container.bind<UserRepository>(TYPES.UserRepository).to(UserRepositoryImplDb);

container.bind<RegistrableController>(TYPES.Controller).to(GroupController);
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceImpl);
container.bind<GroupRepository>(TYPES.GroupRepository).to(GroupRepositoryImplDb);

export default container;
