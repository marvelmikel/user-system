import { Query, Resolver } from '@nestjs/graphql';
import { AdminType } from './admin.type';

@Resolver((of) => AdminType)
export class AdminResolver {
  @Query(() => AdminType)
  sayHello() {
    return {
      id: '7383474hur84',
      firstname: 'henry',
      middlename: 'emeka',
      lastname: 'obadoni',
      email: 'jediiry@gmail.com',
    };
  }
}
