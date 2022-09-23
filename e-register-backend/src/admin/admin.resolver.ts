import { Query, Resolver } from '@nestjs/graphql';

@Resolver()
export class AdminResolver {
  @Query(() => String)
  sayHello(): string {
    return 'Hello World!';
  }
}
