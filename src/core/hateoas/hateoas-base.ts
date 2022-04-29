import { Injectable } from '@nestjs/common';
import {
  ControllerClass,
  ControllerMethod,
  UrlGeneratorService,
} from 'nestjs-url-generator';
import { HateoasLinks } from './hateoas.interface';

@Injectable()
export class HateoasBase {
  constructor(private readonly urlGeneratorService: UrlGeneratorService) {}
  LINKS: HateoasLinks[] = [];

  protected adicionaLink(
    metodo: string,
    descricao: string,
    controller: ControllerClass,
    controllerMethod: ControllerMethod,
    param?: any,
  ) {
    this.LINKS.push({
      type: metodo,
      rel: descricao,
      uri: this.urlGeneratorService.generateUrlFromController({
        controller: controller,
        controllerMethod: controllerMethod,
        params: param,
      }),
    });
  }
}
