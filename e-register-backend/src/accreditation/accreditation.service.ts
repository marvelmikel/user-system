import { Injectable } from '@nestjs/common';
import { CreateAccreditationInput } from './dto/create-accreditation.input';
import { UpdateAccreditationInput } from './dto/update-accreditation.input';

@Injectable()
export class AccreditationService {
  create(createAccreditationInput: CreateAccreditationInput) {
    return 'This action adds a new accreditation';
  }

  findAll() {
    return `This action returns all accreditation`;
  }

  findOne(id: number) {
    return `This action returns a #${id} accreditation`;
  }

  update(id: number, updateAccreditationInput: UpdateAccreditationInput) {
    return `This action updates a #${id} accreditation`;
  }

  remove(id: number) {
    return `This action removes a #${id} accreditation`;
  }
}
