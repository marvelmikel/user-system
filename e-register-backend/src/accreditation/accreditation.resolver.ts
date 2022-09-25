import { Resolver, Query, Mutation, Args, Int } from '@nestjs/graphql';
import { AccreditationService } from './accreditation.service';
import { Accreditation } from './entities/accreditation.entity';
import { CreateAccreditationInput } from './dto/create-accreditation.input';
import { UpdateAccreditationInput } from './dto/update-accreditation.input';

@Resolver(() => Accreditation)
export class AccreditationResolver {
  constructor(private readonly accreditationService: AccreditationService) {}

  @Mutation(() => Accreditation)
  createAccreditation(@Args('createAccreditationInput') createAccreditationInput: CreateAccreditationInput) {
    return this.accreditationService.create(createAccreditationInput);
  }

  @Query(() => [Accreditation], { name: 'accreditation' })
  findAll() {
    return this.accreditationService.findAll();
  }

  @Query(() => Accreditation, { name: 'accreditation' })
  findOne(@Args('id', { type: () => Int }) id: number) {
    return this.accreditationService.findOne(id);
  }

  @Mutation(() => Accreditation)
  updateAccreditation(@Args('updateAccreditationInput') updateAccreditationInput: UpdateAccreditationInput) {
    return this.accreditationService.update(updateAccreditationInput.id, updateAccreditationInput);
  }

  @Mutation(() => Accreditation)
  removeAccreditation(@Args('id', { type: () => Int }) id: number) {
    return this.accreditationService.remove(id);
  }
}
