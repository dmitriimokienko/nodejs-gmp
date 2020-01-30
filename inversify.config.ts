import { Container } from 'inversify';
import { TYPES } from './src/types';
import { GroupServiceImpl } from './src/modules/group/service';
import { Controller, GroupRepository, GroupService } from './src/modules/group/interfaces';
import { GroupController } from './src/modules/group/controller/controller';
import { GroupRepositoryImplPostgresql } from './src/modules/group/dao';

const container = new Container();

container.bind<Controller>(TYPES.GroupController).to(GroupController);
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceImpl);
container.bind<GroupRepository>(TYPES.GroupRepository).to(GroupRepositoryImplPostgresql);

export default container;
