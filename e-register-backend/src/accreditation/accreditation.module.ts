import { Module } from '@nestjs/common';
import { AccreditationService } from './accreditation.service';
import { AccreditationResolver } from './accreditation.resolver';

@Module({
  providers: [AccreditationResolver, AccreditationService]
})
export class AccreditationModule {}
