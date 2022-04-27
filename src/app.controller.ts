import { Controller, Get } from '@nestjs/common';
import { HateoasIndex } from './core/hateoas/hateoas-index';

@Controller('api')
export class AppController {
  constructor(private hateOas: HateoasIndex) {}
  @Get()
  index() {
    return { links: this.hateOas.gerarLinksHateoas() };
  }
}
