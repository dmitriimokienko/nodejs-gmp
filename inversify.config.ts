import { Container } from 'inversify';
import { TYPES } from './src/types';
import { GroupServiceImpl } from './src/modules/group/service';
import { Controller, GroupService } from './src/modules/group/interfaces';
import { GroupController } from './src/modules/group/controller/controller';

const container = new Container();

container.bind<Controller>(TYPES.GroupController).to(GroupController);
container.bind<GroupService>(TYPES.GroupService).to(GroupServiceImpl);

export default container;
