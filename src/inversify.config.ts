import { Container } from 'inversify';
import { TYPES } from './types';
import { RegistrableController } from "./interfaces";

import { GroupRepository, GroupService } from './modules/group/interfaces';
import { GroupController } from './modules/group/controller';
import { GroupServiceImpl } from './modules/group/service';
import { GroupRepositoryImplPostgres } from './modules/group/data-access';

const container = new Container();

container.bind<RegistrableController>(TYPES.Controller).to(GroupController);

container.bind<GroupService>(TYPES.GroupService).to(GroupServiceImpl);
container.bind<GroupRepository>(TYPES.GroupRepository).to(GroupRepositoryImplPostgres);

export default container;
