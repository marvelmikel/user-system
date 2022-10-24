import { Controller, Get, Res } from '@nestjs/common';

@Controller('/')
export class GlobalController {
  @Get()
  loadGraphql(@Res() res) {
    return res.redirect('/graphql');
  }
}
