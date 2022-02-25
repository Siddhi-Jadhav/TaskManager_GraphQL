import { GQLAuthguard } from './../user/gql.authguard';
import { UseGuards } from '@nestjs/common';
import { UserEntity } from './../user/user.entity';
import { TaskService } from './task.service';
import { TaskType } from './type/task.type';
import { Args, Mutation, Query, Resolver } from '@nestjs/graphql';
import { GetUser } from 'src/user/get.user.decorator';
import { TaskInputType } from './type/task.input';
import { TaskStatus } from './task.enum';

@Resolver((of) => TaskType)
@UseGuards(GQLAuthguard)
export class TaskResolver {
  constructor(private taskService: TaskService) {}

  @Query((returns) => [TaskType])
  getTasks(@Args('status') status: string, @GetUser() user: UserEntity) {
    return this.taskService.getTasks(user, status);
  }

  @Mutation((returns) => TaskType)
  createTask(@Args('input') input: TaskInputType, @GetUser() user: UserEntity) {
    return this.taskService.createTask(input, user);
  }

  @Mutation((returns) => TaskType)
  updateTaskStatus(
    @Args('id') id: number,
    @Args('status') status: string,
    @GetUser() user: UserEntity,
  ) {
    let taskStatus: TaskStatus;
    if (status == 'OPEN') {
      taskStatus = TaskStatus.OPEN;
    } else if (status == 'IN_PROGRESS') {
      taskStatus = TaskStatus.IN_PROGRESS;
    } else if (status == 'DONE') {
      taskStatus = TaskStatus.DONE;
    }

    return this.taskService.updateTaskStatus(id, taskStatus);
  }
}
